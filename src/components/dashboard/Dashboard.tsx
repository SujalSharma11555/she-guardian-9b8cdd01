
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Phone, Shield, Users, Volume2, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import SOSButton from "@/components/sos/SOSButton";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import LocationSharing from "@/components/location/LocationSharing";

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
      <Card className="glass-card shadow-md border-she-pink/10 animate-fade-in overflow-hidden">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-she-pink/20 rounded-full"></div>
        <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-she-purple/10 rounded-full"></div>
        <CardHeader className="pb-2 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-bold gradient-text">Welcome back</CardTitle>
              <CardDescription className="text-gray-600">
                {user?.name || "User"}
              </CardDescription>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 mr-2 float">
                <img 
                  src="/lovable-uploads/31aeb8e2-e1df-4f50-a065-45545bf03094.png" 
                  alt="SHE-Guardian Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <Avatar className="border-2 border-she-pink">
                <AvatarImage src={user?.photoUrl || ""} alt={user?.name || "User"} />
                <AvatarFallback className="bg-she-pink text-she-purple">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* SOS card */}
      <Card className="glass-card shadow-md border-she-pink/10 animate-slide-up relative overflow-hidden" style={{ animationDelay: "0.1s" }}>
        <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-red-100 rounded-full opacity-60"></div>
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl font-bold text-she-coral">Emergency SOS</CardTitle>
          <CardDescription>
            Hold the button to activate emergency protocols
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6 relative z-10">
          <SOSButton />
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="glass-card shadow-md border-she-pink/10 animate-scale-in card-hover cursor-pointer" 
          style={{ animationDelay: "0.2s" }}
          onClick={() => navigate("/contacts")}
        >
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-she-pink/30 to-she-purple/20 flex items-center justify-center mb-3">
              <Users className="h-6 w-6 text-she-purple" />
            </div>
            <h3 className="font-medium text-gray-800">Emergency Contacts</h3>
            <p className="text-xs text-gray-500 mt-1">Manage your trusted contacts</p>
          </CardContent>
        </Card>

        <Card 
          className="glass-card shadow-md border-she-pink/10 animate-scale-in card-hover cursor-pointer" 
          style={{ animationDelay: "0.3s" }}
          onClick={() => navigate("/panic")}
        >
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-she-pink/30 to-she-purple/20 flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-she-purple" />
            </div>
            <h3 className="font-medium text-gray-800">Panic Mode</h3>
            <p className="text-xs text-gray-500 mt-1">Configure emergency protocols</p>
          </CardContent>
        </Card>

        <Card 
          className="glass-card shadow-md border-she-pink/10 animate-scale-in card-hover cursor-pointer" 
          style={{ animationDelay: "0.4s" }}
          onClick={() => navigate("/voice")}
        >
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-she-pink/30 to-she-purple/20 flex items-center justify-center mb-3">
              <Volume2 className="h-6 w-6 text-she-purple" />
            </div>
            <h3 className="font-medium text-gray-800">Voice Commands</h3>
            <p className="text-xs text-gray-500 mt-1">Activate SOS with your voice</p>
          </CardContent>
        </Card>

        <Card 
          className="glass-card shadow-md border-she-pink/10 animate-scale-in card-hover cursor-pointer" 
          style={{ animationDelay: "0.5s" }}
          onClick={() => navigate("/checkin")}
        >
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-she-pink/30 to-she-purple/20 flex items-center justify-center mb-3">
              <Clock className="h-6 w-6 text-she-purple" />
            </div>
            <h3 className="font-medium text-gray-800">Safety Check-In</h3>
            <p className="text-xs text-gray-500 mt-1">Set timers for activities</p>
          </CardContent>
        </Card>

        <Card 
          className="glass-card shadow-md border-she-pink/10 animate-scale-in card-hover cursor-pointer" 
          style={{ animationDelay: "0.6s" }}
          onClick={triggerFakeCall}
        >
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-she-pink/30 to-she-purple/20 flex items-center justify-center mb-3">
              <Phone className="h-6 w-6 text-she-purple" />
            </div>
            <h3 className="font-medium text-gray-800">Fake Call</h3>
            <p className="text-xs text-gray-500 mt-1">Trigger a fake incoming call</p>
          </CardContent>
        </Card>

        <Card 
          className="glass-card shadow-md border-she-pink/10 animate-scale-in card-hover cursor-pointer relative overflow-hidden" 
          style={{ animationDelay: "0.7s" }}
          onClick={() => {
            toast({
              title: "Notification Settings",
              description: "Opening notification preferences...",
            });
          }}
        >
          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-she-pink/20 rounded-full"></div>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-she-pink/30 to-she-purple/20 flex items-center justify-center mb-3">
              <Bell className="h-6 w-6 text-she-purple" />
            </div>
            <h3 className="font-medium text-gray-800">Notifications</h3>
            <p className="text-xs text-gray-500 mt-1">Manage alert preferences</p>
          </CardContent>
        </Card>
      </div>

      {/* Location sharing */}
      <div className="animate-slide-up" style={{ animationDelay: "0.8s" }}>
        <LocationSharing />
      </div>
    </div>
  );
};

export default Dashboard;
