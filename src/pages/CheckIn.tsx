
import React from "react";
import Layout from "@/components/Layout";
import SafetyCheckIn from "@/components/checkin/SafetyCheckIn";

const CheckIn = () => {
  return (
    <Layout>
      <div className="py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Safety Check-In</h1>
        <SafetyCheckIn />
      </div>
    </Layout>
  );
};

export default CheckIn;
