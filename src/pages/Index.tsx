
import React, { useEffect } from "react";
import SafetyQuestion from "@/components/safety/SafetyQuestion";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user, initialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized && user) {
      // If user is already logged in, redirect to dashboard
      navigate("/dashboard");
    }
  }, [user, initialized, navigate]);

  return (
    <Layout hideNavigation>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <SafetyQuestion />
      </div>
    </Layout>
  );
};

export default Index;
