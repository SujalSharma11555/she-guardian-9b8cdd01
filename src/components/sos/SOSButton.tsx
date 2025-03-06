
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

const SOSButton: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [pressDuration, setPressDuration] = useState(0);
  const [pressTimer, setPressTimer] = useState<number | null>(null);
  const requiredPressDuration = 3; // seconds

  const startPress = () => {
    setIsPressed(true);
    const startTime = Date.now();
    
    const timer = window.setInterval(() => {
      const duration = (Date.now() - startTime) / 1000;
      setPressDuration(duration);
      
      if (duration >= requiredPressDuration) {
        clearInterval(timer);
        activateSOS();
      }
    }, 100);
    
    setPressTimer(timer);
  };

  const endPress = () => {
    if (pressTimer) {
      clearInterval(pressTimer);
    }
    setIsPressed(false);
    setPressDuration(0);
    setPressTimer(null);
  };

  const activateSOS = () => {
    endPress();
    
    toast({
      title: "SOS Activated",
      description: "Emergency contacts will be notified with your location",
      variant: "destructive",
    });
    
    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
    
    // In a real app, this would trigger emergency protocols
    console.log("SOS activated - would send emergency alerts and location");
  };

  // Calculate progress for the visual ring
  const progress = Math.min((pressDuration / requiredPressDuration) * 100, 100);
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mb-4">
        <button
          className={`sos-button w-24 h-24 flex items-center justify-center text-white ${
            isPressed ? "scale-95" : "scale-100"
          }`}
          onTouchStart={startPress}
          onTouchEnd={endPress}
          onMouseDown={startPress}
          onMouseUp={endPress}
          onMouseLeave={isPressed ? endPress : undefined}
        >
          <AlertTriangle size={40} />
        </button>
        
        {/* Progress ring */}
        {isPressed && (
          <svg 
            className="absolute top-0 left-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ffc9c9"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-100 ease-linear"
            />
          </svg>
        )}
      </div>
      <p className="text-center text-gray-600 dark:text-gray-300 text-sm font-medium">
        Press and hold for {requiredPressDuration} seconds to activate SOS
      </p>
    </div>
  );
};

export default SOSButton;
