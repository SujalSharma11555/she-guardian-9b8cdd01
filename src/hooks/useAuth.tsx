
import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (method: "google" | "facebook") => Promise<void>;
  logout: () => Promise<void>;
  initialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock implementation for now
// In a real app, you would integrate with Firebase Authentication
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("she-guardian-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
    setInitialized(true);
  }, []);

  const login = async (method: "google" | "facebook") => {
    setLoading(true);
    try {
      // Mock implementation
      const mockUser = {
        id: "user-123",
        name: method === "google" ? "User Google" : "User Facebook",
        email: "user@example.com",
        photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      };
      
      setUser(mockUser);
      localStorage.setItem("she-guardian-user", JSON.stringify(mockUser));
      toast({
        title: "Login successful",
        description: `Logged in with ${method.charAt(0).toUpperCase() + method.slice(1)}`,
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "There was a problem with your login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem("she-guardian-user");
      toast({
        title: "Logout successful",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was a problem with your logout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
