
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeIcon, PhoneIcon, ShieldIcon, UsersIcon, MoreHorizontalIcon } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavigation = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const navItems = [
    { icon: HomeIcon, path: "/dashboard", label: "Home" },
    { icon: PhoneIcon, path: "/contacts", label: "Contacts" },
    { icon: ShieldIcon, path: "/panic", label: "Panic" },
    { icon: UsersIcon, path: "/voice", label: "Voice" },
    { icon: MoreHorizontalIcon, path: "/more", label: "More" },
  ];

  return (
    <div className="min-h-screen bg-she-white dark:bg-gray-900 flex flex-col">
      <div className="flex-1 max-w-screen-md mx-auto w-full px-4 pb-20">
        {children}
      </div>

      {!hideNavigation && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg z-10">
          <div className="max-w-screen-md mx-auto">
            <div className="flex justify-around items-center h-16">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`nav-item group ${
                    path === item.path
                      ? "text-she-coral dark:text-she-deepPink"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  aria-label={item.label}
                >
                  <div className="flex flex-col items-center">
                    <item.icon size={22} className="transition-all duration-200" />
                    <span className={`text-[10px] mt-1 transition-all duration-200 ${
                      path === item.path ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                    }`}>
                      {item.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
