
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import SafetyQuestion from "@/components/safety/SafetyQuestion";
import AuthForm from "@/components/auth/AuthForm";

const Index = () => {
  const navigate = useNavigate();
  const [showSafety, setShowSafety] = useState(true);
  
  const handleSafetyComplete = () => {
    setShowSafety(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-she-white to-she-pink/30">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-she-purple rounded-full flex items-center justify-center mb-4 shadow-lg">
          <ShieldAlert size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-she-purple mb-1">SHE-Guardian</h1>
        <p className="text-gray-600 text-center max-w-xs">Advanced safety app designed to protect women</p>
      </div>
      
      {showSafety ? (
        <div className="w-full max-w-md animate-fade-in">
          <SafetyQuestion onComplete={handleSafetyComplete} />
        </div>
      ) : (
        <div className="w-full max-w-md animate-fade-in">
          <AuthForm />
        </div>
      )}
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>© 2023 SHE-Guardian. Created by Anvi Agarwal & Sujal Sharma</p>
      </div>
    </div>
  );
};

export default Index;
