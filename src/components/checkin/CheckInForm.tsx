
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CheckInFormProps {
  activity: string;
  setActivity: (value: string) => void;
  customActivity: string;
  setCustomActivity: (value: string) => void;
  duration: string;
  setDuration: (value: string) => void;
  onStartCheckIn: () => void;
}

const CheckInForm: React.FC<CheckInFormProps> = ({
  activity,
  setActivity,
  customActivity,
  setCustomActivity,
  duration,
  setDuration,
  onStartCheckIn,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="activity">Activity</Label>
        <Select value={activity} onValueChange={setActivity}>
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
        <Select value={duration} onValueChange={setDuration}>
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
        onClick={onStartCheckIn}
      >
        Start Safety Check-In
      </Button>
    </div>
  );
};

export default CheckInForm;
