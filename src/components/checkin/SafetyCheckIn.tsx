
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Clock, CheckCircle, X, Bell, Shield } from "lucide-react";

const SafetyCheckIn: React.FC = () => {
  const [isCheckInActive, setIsCheckInActive] = useState(false);
  const [activity, setActivity] = useState("travel");
  const [duration, setDuration] = useState("30");
  const [customActivity, setCustomActivity] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  const startCheckIn = () => {
    const durationInMinutes = parseInt(duration, 10);
    const durationInSeconds = durationInMinutes * 60;
    setTimeRemaining(durationInSeconds);
    setIsCheckInActive(true);

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

  const endCheckIn = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setIsCheckInActive(false);
    
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

  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-3xl font-bold text-she-purple">
                    {formatTimeRemaining()}
                  </div>
                </div>
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#f0f0f0" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#9370DB" 
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * getProgressPercentage() / 100)}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500 mt-2">Time remaining until check-in required</p>
            </div>
            
            <div className="bg-she-pink/20 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">
                    {activity === "custom" ? customActivity : activity.charAt(0).toUpperCase() + activity.slice(1)}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Check-in required in {formatTimeRemaining()}
                  </p>
                </div>
                <Bell className="text-she-purple" size={20} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                className="w-full bg-green-500 hover:bg-green-600"
                onClick={endCheckIn}
              >
                <CheckCircle className="mr-2" size={16} />
                I'm Safe
              </Button>
              
              <Button 
                className="w-full bg-red-500 hover:bg-red-600"
                onClick={triggerAlert}
              >
                <Shield className="mr-2" size={16} />
                Alert Contacts
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="activity">Activity</Label>
              <Select 
                value={activity} 
                onValueChange={setActivity}
              >
                <SelectTrigger id="activity" className="w-full">
                  <SelectValue placeholder="Select an activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="walk">Walking</SelectItem>
                  <SelectItem value="commute">Commute</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="taxi">Taxi/Ride</SelectItem>
                  <SelectItem value="custom">Custom Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {activity === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="custom-activity">Custom Activity Name</Label>
                <Input
                  id="custom-activity"
                  placeholder="Enter activity name"
                  value={customActivity}
                  onChange={(e) => setCustomActivity(e.target.value)}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select 
                value={duration} 
                onValueChange={setDuration}
              >
                <SelectTrigger id="duration" className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="180">3 hours</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="w-full bg-she-purple hover:bg-she-purple/90"
              onClick={startCheckIn}
            >
              Start Safety Check-In
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SafetyCheckIn;
