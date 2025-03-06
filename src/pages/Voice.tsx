
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Mic } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Voice = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceActivated, setVoiceActivated] = useState(true);

  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      toast({
        title: "Voice Recognition Active",
        description: "Listening for emergency keywords...",
      });
      
      // Simulate voice detection after a few seconds
      setTimeout(() => {
        if (Math.random() > 0.5) {
          handleVoiceCommand();
        }
        setIsListening(false);
      }, 5000);
    } else {
      toast({
        title: "Voice Recognition Stopped",
        description: "No longer listening for commands",
      });
    }
  };

  const handleVoiceCommand = () => {
    toast({
      title: "Emergency Keyword Detected!",
      description: "SOS protocols activated by voice command",
      variant: "destructive",
    });
    
    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const toggleVoiceActivation = () => {
    setVoiceActivated(!voiceActivated);
    toast({
      title: voiceActivated ? "Voice Activation Disabled" : "Voice Activation Enabled",
      description: voiceActivated 
        ? "Voice command detection has been turned off" 
        : "The app will now listen for emergency keywords",
    });
  };

  return (
    <Layout>
      <div className="py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Voice Commands</h1>
        
        <div className="space-y-6">
          <Card className="glass-card shadow-md border-she-pink/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Voice Command SOS</CardTitle>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={toggleVoiceActivation}
                >
                  {voiceActivated ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </Button>
              </div>
              <CardDescription>
                Use specific voice commands to activate SOS in emergencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-she-pink/10 p-4 rounded-lg">
                  <h3 className="font-medium text-she-purple mb-2">Emergency Keywords</h3>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-300">
                    <li>"Help me"</li>
                    <li>"Emergency"</li>
                    <li>"SHE Guardian help"</li>
                    <li>"I'm in danger"</li>
                    <li>"SOS"</li>
                  </ul>
                </div>
                
                <div className="text-center pt-4">
                  <Button 
                    className={`h-20 w-20 rounded-full ${
                      isListening 
                        ? "bg-she-coral animate-pulse" 
                        : "bg-she-purple"
                    }`}
                    disabled={!voiceActivated}
                    onClick={toggleListening}
                  >
                    <Mic size={30} />
                  </Button>
                  <p className="mt-4 text-sm">
                    {isListening
                      ? "Listening for commands..."
                      : voiceActivated 
                        ? "Tap to start listening" 
                        : "Voice activation is disabled"
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card shadow-md border-she-pink/10">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  The voice command feature listens for specific emergency keywords. When detected:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Emergency contacts are notified</li>
                  <li>Your current location is shared</li>
                  <li>Audio recording begins automatically</li>
                  <li>Emergency services can be contacted</li>
                </ul>
                <p className="mt-2 text-xs italic">
                  Note: For optimal performance, speak clearly and directly toward your device.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Voice;
