
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { MapPin, Users, Clock } from "lucide-react";

const LocationSharing: React.FC = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [duration, setDuration] = useState<number>(30); // minutes
  
  const toggleLocationSharing = () => {
    if (isSharing) {
      stopSharing();
    } else {
      startSharing();
    }
  };
  
  const startSharing = () => {
    // In a real app, this would use the Geolocation API to get and share location
    setIsSharing(true);
    
    // Mock location data
    const mockLocation = {
      latitude: 40.7128,
      longitude: -74.0060,
      accuracy: 10,
    };
    
    toast({
      title: "Location Sharing Started",
      description: `Your location will be shared for ${duration} minutes`,
    });
    
    console.log("Started sharing location:", mockLocation);
  };
  
  const stopSharing = () => {
    setIsSharing(false);
    
    toast({
      title: "Location Sharing Stopped",
      description: "Your contacts will no longer receive your location updates",
    });
  };
  
  return (
    <Card className="glass-card shadow-md border-she-pink/10">
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <MapPin className="text-she-purple mr-2" size={18} />
          <CardTitle className="text-base">Location Sharing</CardTitle>
        </div>
        <CardDescription>
          Share your real-time location with trusted contacts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isSharing && (
          <div className="flex items-center space-x-2 mb-4">
            <Clock size={16} className="text-gray-500" />
            <span className="text-sm">Share for:</span>
            <div className="flex space-x-1">
              {[30, 60, 120].map((mins) => (
                <Button
                  key={mins}
                  size="sm"
                  variant={duration === mins ? "secondary" : "outline"}
                  className="h-8 px-2 text-xs"
                  onClick={() => setDuration(mins)}
                >
                  {mins} min
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <Button 
          className={`w-full ${
            isSharing 
              ? "bg-red-500 hover:bg-red-600"
              : "bg-she-purple hover:bg-she-purple/90"
          }`}
          onClick={toggleLocationSharing}
        >
          {isSharing ? (
            <>Stop Sharing Location</>
          ) : (
            <>Share My Location</>
          )}
        </Button>
        
        {isSharing && (
          <div className="mt-4 bg-she-pink/20 p-3 rounded-md">
            <div className="flex items-center mb-2">
              <Users size={16} className="text-gray-500 mr-2" />
              <span className="text-sm font-medium">Sharing with:</span>
            </div>
            <div className="space-y-1 pl-6">
              <p className="text-xs">• Emergency Contacts (3)</p>
              <p className="text-xs text-gray-500">Location updates every 30 seconds</p>
              <p className="text-xs text-gray-500">Time remaining: {duration} minutes</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationSharing;
