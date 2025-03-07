
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Clock } from "lucide-react";
import CheckInForm from "./CheckInForm";
import CheckInTimer from "./CheckInTimer";
import ActiveCheckInControls from "./ActiveCheckInControls";

const SafetyCheckIn: React.FC = () => {
  const [isCheckInActive, setIsCheckInActive] = useState(false);
  const [activity, setActivity] = useState("travel");
  const [duration, setDuration] = useState("30");
  const [customActivity, setCustomActivity] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  // Get current location when check-in starts
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Unable to get your current location. Your last known location will be used instead.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  const startCheckIn = () => {
    const durationInMinutes = parseInt(duration, 10);
    const durationInSeconds = durationInMinutes * 60;
    setTimeRemaining(durationInSeconds);
    setIsCheckInActive(true);
    getCurrentLocation();

    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          triggerAlert();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    setTimerInterval(intervalId);

    const activityName = activity === "custom" ? customActivity : activity;
    
    toast({
      title: "Safety Check-In Started",
      description: `We'll check on you in ${durationInMinutes} minutes. Stay safe!`,
    });
  };

  const extendTime = () => {
    const extraMinutes = 10;
    const extraSeconds = extraMinutes * 60;
    setTimeRemaining(prevTime => prevTime + extraSeconds);
    
    toast({
      title: "Time Extended",
      description: `Added ${extraMinutes} minutes to your check-in timer.`,
    });
  };

  const endCheckIn = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setIsCheckInActive(false);
    setLocation(null);
    
    toast({
      title: "Safety Check-In Completed",
      description: "Glad you're safe! Check-in has been marked as complete.",
    });
  };

  const triggerAlert = () => {
    // In a real app, this would notify emergency contacts
    toast({
      title: "Safety Alert Triggered",
      description: "Your emergency contacts have been notified with your last known location.",
      variant: "destructive",
    });
    
    setIsCheckInActive(false);
  };

  const getProgressPercentage = () => {
    const initialSeconds = parseInt(duration, 10) * 60;
    return Math.max(0, (timeRemaining / initialSeconds) * 100);
  };

  return (
    <Card className="glass-card shadow-md border-she-pink/10">
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <Clock className="text-she-purple mr-2" size={18} />
          <CardTitle>Safety Check-In</CardTitle>
        </div>
        <CardDescription>
          Set a timer for your activities and we'll check on you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isCheckInActive ? (
          <div className="space-y-6">
            <CheckInTimer 
              timeRemaining={timeRemaining}
              progressPercentage={getProgressPercentage()}
              activity={activity}
              customActivity={customActivity}
            />
            
            <ActiveCheckInControls 
              onExtendTime={extendTime}
              onEndCheckIn={endCheckIn}
              onTriggerAlert={triggerAlert}
            />
          </div>
        ) : (
          <CheckInForm 
            activity={activity}
            setActivity={setActivity}
            customActivity={customActivity}
            setCustomActivity={setCustomActivity}
            duration={duration}
            setDuration={setDuration}
            onStartCheckIn={startCheckIn}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SafetyCheckIn;
