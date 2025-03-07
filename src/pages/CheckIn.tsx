
import React from "react";
import Layout from "@/components/Layout";
import SafetyCheckIn from "@/components/checkin/SafetyCheckIn";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Bell, Users } from "lucide-react";

const CheckIn = () => {
  return (
    <Layout>
      <div className="py-6 px-4">
        <h1 className="text-2xl font-bold mb-3 text-she-purple">Safety Check-In</h1>
        <p className="text-gray-500 mb-6">
          Set a timer for your activities, and if you don't check-in when the timer expires, 
          your emergency contacts will be automatically notified.
        </p>
        
        <div className="grid gap-6">
          <SafetyCheckIn />
          
          <Card className="glass-card shadow-md border-she-pink/10">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Bell className="mr-2 text-she-purple" size={18} />
                How Safety Check-In Works
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-she-pink/20 flex items-center justify-center text-she-purple">1</div>
                  <div>
                    <h3 className="font-medium">Set your activity and duration</h3>
                    <p className="text-sm text-gray-500">Choose what you're doing and how long it should take</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-she-pink/20 flex items-center justify-center text-she-purple">2</div>
                  <div>
                    <h3 className="font-medium">Start your timer</h3>
                    <p className="text-sm text-gray-500">We'll track your location while the timer is active</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-she-pink/20 flex items-center justify-center text-she-purple">3</div>
                  <div>
                    <h3 className="font-medium">Check in when you're safe</h3>
                    <p className="text-sm text-gray-500">Tap "I'm Safe" before the timer expires</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-she-pink/20 flex items-center justify-center text-she-purple">4</div>
                  <div>
                    <h3 className="font-medium">If you don't check in...</h3>
                    <p className="text-sm text-gray-500">Your emergency contacts will be notified with your last location</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="mr-2" size={16} />
                    <span>Make sure you have emergency contacts configured</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CheckIn;
