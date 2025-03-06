
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Volume2, Mic, MicOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const VoiceCommands: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [triggerPhrase, setTriggerPhrase] = useState("help me");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const { user } = useAuth();

  const toggleListening = () => {
    if (!voiceEnabled) return;
    
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    // In a real implementation, this would initialize speech recognition
    setIsListening(true);
    toast({
      title: "Voice Recognition Active",
      description: `Say "${triggerPhrase}" to trigger SOS`,
    });
  };

  const stopListening = () => {
    // In a real implementation, this would stop speech recognition
    setIsListening(false);
    toast({
      title: "Voice Recognition Stopped",
      description: "Voice commands are now inactive",
    });
  };

  const toggleVoiceEnabled = () => {
    const newState = !voiceEnabled;
    setVoiceEnabled(newState);
    if (!newState && isListening) {
      stopListening();
    }
  };

  // Mock detection of voice command for demo purposes
  useEffect(() => {
    if (!isListening) return;
    
    const timeoutId = setTimeout(() => {
      // Simulating voice detection after 10 seconds
      if (isListening) {
        toast({
          title: "SOS Triggered by Voice",
          description: `Phrase "${triggerPhrase}" detected! Sending alerts...`,
          variant: "destructive",
        });
        
        // In a real app, this would trigger the SOS protocols
        setIsListening(false);
      }
    }, 10000);
    
    return () => clearTimeout(timeoutId);
  }, [isListening, triggerPhrase]);

  return (
    <div className="w-full space-y-4">
      <Card className="glass-card shadow-md border-she-pink/10">
        <CardHeader>
          <div className="flex items-center">
            <Volume2 className="text-she-purple mr-2" size={18} />
            <CardTitle className="text-lg">Voice Command SOS</CardTitle>
          </div>
          <CardDescription>
            Activate SOS with voice commands for hands-free emergencies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label htmlFor="voice-enabled">Enable Voice Commands</Label>
            </div>
            <Switch
              id="voice-enabled"
              checked={voiceEnabled}
              onCheckedChange={toggleVoiceEnabled}
            />
          </div>
          
          <div className="flex justify-center py-6">
            <Button
              disabled={!voiceEnabled}
              onClick={toggleListening}
              className={`h-24 w-24 rounded-full flex items-center justify-center ${
                isListening 
                  ? "bg-she-coral text-white animate-pulse" 
                  : "bg-she-purple text-white"
              }`}
            >
              {isListening ? (
                <MicOff size={32} />
              ) : (
                <Mic size={32} />
              )}
            </Button>
          </div>
          
          <p className="text-sm text-center">
            {isListening 
              ? "Listening for trigger phrase..."
              : "Press the button to start listening"}
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <h3 className="text-sm font-medium mb-2">Trigger phrase</h3>
            <p className="text-sm italic">"{triggerPhrase}"</p>
          </div>
          
          <div className="text-sm text-gray-500 mt-2">
            <p>When active, the app listens for your voice commands. If you say the trigger phrase, 
            it will automatically activate the SOS protocol.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceCommands;
