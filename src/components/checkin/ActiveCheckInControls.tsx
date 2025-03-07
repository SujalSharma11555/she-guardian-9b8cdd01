
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Timer, AlertTriangle } from "lucide-react";

interface ActiveCheckInControlsProps {
  onExtendTime: () => void;
  onEndCheckIn: () => void;
  onTriggerAlert: () => void;
}

const ActiveCheckInControls: React.FC<ActiveCheckInControlsProps> = ({
  onExtendTime,
  onEndCheckIn,
  onTriggerAlert,
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <Button
        variant="outline"
        className="w-full border-dashed border-gray-300 text-gray-500 hover:bg-she-pink/10 hover:text-she-purple hover:border-she-purple transition-all duration-300"
        onClick={onExtendTime}
      >
        <Timer className="mr-2" size={16} />
        Add 10 minutes to timer
      </Button>

      <div className="grid grid-cols-2 gap-3">
        <Button
          className="w-full bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={onEndCheckIn}
        >
          <CheckCircle className="mr-2" size={16} />
          I'm Safe
        </Button>

        <Button
          className="w-full bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={onTriggerAlert}
        >
          <AlertTriangle className="mr-2" size={16} />
          Alert Contacts
        </Button>
      </div>
    </div>
  );
};

export default ActiveCheckInControls;
