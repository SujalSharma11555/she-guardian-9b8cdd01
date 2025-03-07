
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
        <div className="w-32 h-32 flex items-center justify-center mb-4">
          <img 
            src="/lovable-uploads/31aeb8e2-e1df-4f50-a065-45545bf03094.png" 
            alt="SHE-Guardian Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold text-she-purple mb-1">SHE-Guardian</h1>
        <p className="text-gray-600 text-center max-w-xs">Suraksha Bhi, Sammaan Bhi</p>
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
        <p>© 2025 SHE-Guardian. Created by Anvi Agarwal & Sujal Sharma</p>
      </div>
    </div>
  );
};

export default Index;
