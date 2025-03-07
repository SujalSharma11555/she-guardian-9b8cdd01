
import React from "react";
import Layout from "@/components/Layout";
import SafetyCheckIn from "@/components/checkin/SafetyCheckIn";

const CheckIn = () => {
  return (
    <Layout>
      <div className="py-6 px-4">
        <h1 className="text-2xl font-bold mb-6 text-she-purple">Safety Check-In</h1>
        <p className="text-gray-500 mb-6">
          Set a timer for your activities, and if you don't check-in when the timer expires, 
          your emergency contacts will be automatically notified.
        </p>
        <SafetyCheckIn />
      </div>
    </Layout>
  );
};

export default CheckIn;
