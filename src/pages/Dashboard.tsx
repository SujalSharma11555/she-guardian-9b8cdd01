
import React from "react";
import Layout from "@/components/Layout";
import DashboardComponent from "@/components/dashboard/Dashboard";

const Dashboard = () => {
  return (
    <Layout>
      <div className="py-6 px-4">
        <DashboardComponent />
      </div>
    </Layout>
  );
};

export default Dashboard;
