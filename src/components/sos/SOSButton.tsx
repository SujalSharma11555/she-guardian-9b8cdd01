
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";

const SOSButton: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [pressDuration, setPressDuration] = useState(0);
  const requiredPressDuration = 3; // seconds
  
  const startPress = () => {
    setIsPressed(true);
    setPressDuration(0);
    
    // Start a timer to track press duration
    const timer = setInterval(() => {
      setPressDuration(prev => {
        const newDuration = prev + 0.1;
        
        // If press is long enough, trigger SOS
        if (newDuration >= requiredPressDuration) {
          triggerSOS();
          clearInterval(timer);
        }
        
        return newDuration;
      });
    }, 100);
    
    setPressTimer(timer);
  };
  
  const endPress = () => {
    setIsPressed(false);
    
    // Clear the timer
    if (pressTimer) {
      clearInterval(pressTimer);
      setPressTimer(null);
    }
    
    // If press was too short, reset
    if (pressDuration < requiredPressDuration) {
      setPressDuration(0);
    }
  };
  
  const triggerSOS = () => {
    // Provide haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
    
    toast({
      title: "SOS Activated",
      description: "Emergency contacts are being notified with your location",
      variant: "destructive",
    });
    
    // In a real app, this would:
    // 1. Send emergency alerts to contacts
    // 2. Share location
    // 3. Start recording audio
    console.log("SOS triggered - would send alerts in a real app");
  };
  
  // Calculate progress percentage
  const progress = (pressDuration / requiredPressDuration) * 100;
  
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse ring (animated) */}
      {isPressed && (
        <div className="absolute w-32 h-32 rounded-full bg-she-coral/20 animate-pulse-soft"></div>
      )}
      
      {/* Progress ring */}
      <div className="absolute w-24 h-24 rounded-full">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          />
          
          {pressDuration > 0 && (
            <circle
              className="text-she-coral stroke-current"
              strokeWidth="8"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * progress) / 100}
              transform="rotate(-90 50 50)"
            />
          )}
        </svg>
      </div>
      
      {/* Button */}
      <button
        className="sos-button w-20 h-20 z-10 flex items-center justify-center"
        onTouchStart={startPress}
        onTouchEnd={endPress}
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={isPressed ? endPress : undefined}
      >
        SOS
      </button>
      
      {/* Instructions */}
      <div className="absolute -bottom-8 whitespace-nowrap text-xs text-gray-500">
        Hold for {requiredPressDuration} seconds to activate
      </div>
    </div>
  );
};

export default SOSButton;
