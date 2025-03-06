
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Phone, Lock, MapPin, Volume2, MessageSquare } from "lucide-react";

const PanicMode: React.FC = () => {
  const [isPanicModeActive, setIsPanicModeActive] = useState(false);
  const [settings, setSettings] = useState({
    lockPhone: true,
    callEmergency: true,
    shareLocation: true,
    recordAudio: true,
    alertContacts: true,
  });

  const togglePanicMode = () => {
    if (!isPanicModeActive) {
      activatePanicMode();
    } else {
      deactivatePanicMode();
    }
  };

  const activatePanicMode = () => {
    setIsPanicModeActive(true);
    
    // Provide haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
    
    toast({
      title: "Panic Mode Activated",
      description: "Your emergency protocols are now active",
      variant: "destructive",
    });
    
    // In a real app, this would trigger emergency protocols based on settings
    console.log("Panic mode activated with settings:", settings);
  };

  const deactivatePanicMode = () => {
    setIsPanicModeActive(false);
    
    toast({
      title: "Panic Mode Deactivated",
      description: "Your emergency protocols have been turned off",
    });
  };

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="w-full space-y-4">
      <Card className={`glass-card shadow-md transition-all duration-300 ${
        isPanicModeActive ? "border-she-coral bg-she-coral/5" : "border-she-pink/10"
      }`}>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Panic Mode</span>
            <Switch
              checked={isPanicModeActive}
              onCheckedChange={togglePanicMode}
              className={isPanicModeActive ? "bg-she-coral" : ""}
            />
          </CardTitle>
          <CardDescription>
            Quickly activate emergency protocols in threatening situations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className={`text-sm ${isPanicModeActive ? "text-she-coral font-medium" : "text-gray-500"}`}>
              {isPanicModeActive 
                ? "Panic mode is currently ACTIVE" 
                : "Configure what happens when panic mode is activated"}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock size={18} className="text-gray-500" />
                  <Label htmlFor="lock-phone" className="text-sm">Lock phone screen</Label>
                </div>
                <Switch
                  id="lock-phone"
                  checked={settings.lockPhone}
                  onCheckedChange={(checked) => updateSetting("lockPhone", checked)}
                  disabled={isPanicModeActive}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone size={18} className="text-gray-500" />
                  <Label htmlFor="call-emergency" className="text-sm">Call emergency services</Label>
                </div>
                <Switch
                  id="call-emergency"
                  checked={settings.callEmergency}
                  onCheckedChange={(checked) => updateSetting("callEmergency", checked)}
                  disabled={isPanicModeActive}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin size={18} className="text-gray-500" />
                  <Label htmlFor="share-location" className="text-sm">Share location with contacts</Label>
                </div>
                <Switch
                  id="share-location"
                  checked={settings.shareLocation}
                  onCheckedChange={(checked) => updateSetting("shareLocation", checked)}
                  disabled={isPanicModeActive}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 size={18} className="text-gray-500" />
                  <Label htmlFor="record-audio" className="text-sm">Record audio</Label>
                </div>
                <Switch
                  id="record-audio"
                  checked={settings.recordAudio}
                  onCheckedChange={(checked) => updateSetting("recordAudio", checked)}
                  disabled={isPanicModeActive}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare size={18} className="text-gray-500" />
                  <Label htmlFor="alert-contacts" className="text-sm">Send alert to emergency contacts</Label>
                </div>
                <Switch
                  id="alert-contacts"
                  checked={settings.alertContacts}
                  onCheckedChange={(checked) => updateSetting("alertContacts", checked)}
                  disabled={isPanicModeActive}
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                className={`w-full ${
                  isPanicModeActive 
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-800" 
                    : "bg-she-coral hover:bg-she-coral/90 text-white"
                }`}
                onClick={togglePanicMode}
              >
                {isPanicModeActive ? "Deactivate Panic Mode" : "Activate Panic Mode"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PanicMode;
