
import React from "react";
import { Bell, MapPin } from "lucide-react";

interface CheckInTimerProps {
  timeRemaining: number;
  progressPercentage: number;
  activity: string;
  customActivity: string;
}

const CheckInTimer: React.FC<CheckInTimerProps> = ({
  timeRemaining,
  progressPercentage,
  activity,
  customActivity,
}) => {
  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const displayActivity = activity === "custom" ? customActivity : activity.charAt(0).toUpperCase() + activity.slice(1);

  return (
    <>
      <div className="text-center">
        <div className="relative w-36 h-36 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-3xl font-bold text-she-purple">
              {formatTimeRemaining()}
            </div>
            <div className="text-xs text-gray-500 mt-1">remaining</div>
          </div>
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
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
              strokeDashoffset={283 - (283 * progressPercentage / 100)}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      
      <div className="bg-she-pink/20 p-4 rounded-md">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">
              {displayActivity}
            </h3>
            <p className="text-xs text-gray-500">
              Check-in required in {formatTimeRemaining()}
            </p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <MapPin size={12} className="mr-1" />
              <span>Location tracking active</span>
            </div>
          </div>
          <Bell className="text-she-purple" size={20} />
        </div>
      </div>
    </>
  );
};

export default CheckInTimer;
