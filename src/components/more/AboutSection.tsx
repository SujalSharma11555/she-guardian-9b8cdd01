
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Sun, Moon, Heart, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";

const AboutSection: React.FC = () => {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full space-y-6 fade-in">
      {/* Mission Card */}
      <Card className="glass-card shadow-md border-she-pink/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="text-she-coral" size={20} />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            SHE-Guardian is dedicated to empowering women through technology and creating a safer world. 
            Our app provides essential safety tools that are easily accessible in moments of need.
          </p>
        </CardContent>
      </Card>

      {/* Founders Card */}
      <Card className="glass-card shadow-md border-she-pink/10">
        <CardHeader>
          <CardTitle>Founders</CardTitle>
          <CardDescription>The team behind SHE-Guardian</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-she-pink/20 flex items-center justify-center">
              <span className="text-she-purple font-medium">AA</span>
            </div>
            <div>
              <h4 className="font-medium">Anvi Agarwal</h4>
              <p className="text-sm text-gray-500">Co-founder & CEO</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-she-pink/20 flex items-center justify-center">
              <span className="text-she-purple font-medium">SS</span>
            </div>
            <div>
              <h4 className="font-medium">Sujal Sharma</h4>
              <p className="text-sm text-gray-500">Co-founder & CTO</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Card */}
      <Card className="glass-card shadow-md border-she-pink/10">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {theme === "dark" ? (
                <Moon size={18} className="text-gray-500" />
              ) : (
                <Sun size={18} className="text-gray-500" />
              )}
              <span>Theme</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>

          <div className="pt-2">
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={() => logout()}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <div className="text-center text-sm text-gray-500 pt-4">
        <div className="flex justify-center items-center mb-2">
          <Shield className="text-she-purple mr-1" size={16} />
          <span className="font-medium text-she-purple">SHE-Guardian</span>
        </div>
        <p>Version 1.0.0</p>
        <p className="mt-1">© 2023 SHE-Guardian. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AboutSection;
