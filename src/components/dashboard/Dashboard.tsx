
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Phone, Shield, Users, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SOSButton from "@/components/sos/SOSButton";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const triggerFakeCall = () => {
    toast({
      title: "Fake Call Initiated",
      description: "Incoming call in 5 seconds...",
    });
    
    // In a real app, this would trigger a fake incoming call
    setTimeout(() => {
      toast({
        title: "Incoming Call",
        description: "Mom is calling...",
      });
    }, 5000);
  };

  return (
    <div className="w-full space-y-6">
      {/* User welcome card */}
      <Card className="glass-card shadow-md border-she-pink/10 animate-fade-in">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Welcome back</CardTitle>
              <CardDescription>
                {user?.name || "User"}
              </CardDescription>
            </div>
            <Avatar>
              <AvatarImage src={user?.photoUrl || ""} alt={user?.name || "User"} />
              <AvatarFallback className="bg-she-pink text-she-purple">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
      </Card>

      {/* SOS card */}
      <Card className="glass-card shadow-md border-she-pink/10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="text-center pb-2">
          <CardTitle>Emergency SOS</CardTitle>
          <CardDescription>
            Hold the button to activate emergency protocols
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <SOSButton />
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="glass-card shadow-md border-she-pink/10 animate-scale-in cursor-pointer hover:shadow-lg transition-all" 
          style={{ animationDelay: "0.2s" }}
          onClick={() => navigate("/contacts")}
        >
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-she-pink/20 flex items-center justify-center mb-3">
              <Users className="h-6 w-6 text-she-purple" />
            </div>
            <h3 className="font-medium">Emergency Contacts</h3>
            <p className="text-xs text-gray-500 mt-1">Manage your trusted contacts</p>
          </CardContent>
        </Card>

        <Card 
          className="glass-card shadow-md border-she-pink/10 animate-scale-in cursor-pointer hover:shadow-lg transition-all" 
          style={{ animationDelay: "0.3s" }}
          onClick={() => navigate("/panic")}
        >
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-she-pink/20 flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-she-purple" />
            </div>
            <h3 className="font-medium">Panic Mode</h3>
            <p className="text-xs text-gray-500 mt-1">Configure emergency protocols</p>
          </CardContent>
        </Card>

        <Card 
          className="glass-card shadow-md border-she-pink/10 animate-scale-in cursor-pointer hover:shadow-lg transition-all" 
          style={{ animationDelay: "0.4s" }}
          onClick={() => navigate("/voice")}
        >
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-she-pink/20 flex items-center justify-center mb-3">
              <Volume2 className="h-6 w-6 text-she-purple" />
            </div>
            <h3 className="font-medium">Voice Commands</h3>
            <p className="text-xs text-gray-500 mt-1">Activate SOS with your voice</p>
          </CardContent>
        </Card>

        <Card 
          className="glass-card shadow-md border-she-pink/10 animate-scale-in cursor-pointer hover:shadow-lg transition-all" 
          style={{ animationDelay: "0.5s" }}
          onClick={triggerFakeCall}
        >
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-she-pink/20 flex items-center justify-center mb-3">
              <Phone className="h-6 w-6 text-she-purple" />
            </div>
            <h3 className="font-medium">Fake Call</h3>
            <p className="text-xs text-gray-500 mt-1">Trigger a fake incoming call</p>
          </CardContent>
        </Card>
      </div>

      {/* Location sharing */}
      <Card 
        className="glass-card shadow-md border-she-pink/10 animate-slide-up" 
        style={{ animationDelay: "0.6s" }}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center">
            <MapPin className="text-she-purple mr-2" size={18} />
            <CardTitle className="text-base">Location Sharing</CardTitle>
          </div>
          <CardDescription>
            Share your real-time location with trusted contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-she-purple hover:bg-she-purple/90">
            Share My Location
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
