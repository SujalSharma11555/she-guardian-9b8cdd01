
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, LogOut, Github, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AboutSection: React.FC = () => {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const handleLogout = async () => {
    await logout();
  };
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} theme activated`,
      description: `Switched to ${newTheme} theme`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card shadow-md border-she-pink/10">
        <CardHeader>
          <CardTitle>About SHE-Guardian</CardTitle>
          <CardDescription>
            Our mission and purpose
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            SHE-Guardian is dedicated to empowering women with advanced safety tools. 
            Our mission is to provide a comprehensive solution that offers peace of mind 
            and quick access to help during emergencies.
          </p>
          
          <div className="bg-she-pink/10 rounded-md p-4 mt-4">
            <h3 className="font-medium mb-2">Founders</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-she-purple text-white flex items-center justify-center mr-2">
                  A
                </div>
                <div>
                  <p className="font-medium">Anvi Agarwal</p>
                  <p className="text-xs text-gray-500">Co-founder</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-she-purple text-white flex items-center justify-center mr-2">
                  S
                </div>
                <div>
                  <p className="font-medium">Sujal Sharma</p>
                  <p className="text-xs text-gray-500">Co-founder</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-4">
            <Button variant="ghost" size="sm" className="text-gray-500">
              <Github size={16} className="mr-1" />
              <span className="text-xs">GitHub</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-500">
              <Heart size={16} className="mr-1" />
              <span className="text-xs">Support Us</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card shadow-md border-she-pink/10">
        <CardHeader>
          <CardTitle>App Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleTheme}
              className="flex items-center"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={16} className="mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={16} className="mr-2" />
                  Dark Mode
                </>
              )}
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-xs text-gray-500 mt-8">
        <p>SHE-Guardian v1.0.0</p>
        <p>© 2023 SHE-Guardian. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AboutSection;
