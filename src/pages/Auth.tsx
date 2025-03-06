
import React, { useEffect } from "react";
import AuthForm from "@/components/auth/AuthForm";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // If user is already logged in, redirect to dashboard
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <Layout hideNavigation>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <AuthForm />
      </div>
    </Layout>
  );
};

export default Auth;
