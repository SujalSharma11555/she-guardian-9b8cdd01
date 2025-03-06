
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const SafetyQuestion: React.FC = () => {
  const [answered, setAnswered] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = () => {
    setAnswered(true);
    toast({
      title: "Safety Verified",
      description: "Thank you for confirming your safety.",
    });
    
    // After a brief delay, navigate to authentication
    setTimeout(() => {
      navigate("/auth");
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 slide-up">
      <Card className="glass-card shadow-xl border-she-pink/20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-she-pink via-she-purple to-she-coral" />
        <CardHeader className="space-y-1 text-center pt-8">
          <div className="w-20 h-20 mx-auto bg-she-pink/20 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-10 h-10 text-she-purple" />
          </div>
          <CardTitle className="text-2xl font-bold">Safety Check</CardTitle>
          <CardDescription>
            Before we begin, please confirm that you are safe at this moment
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 pt-4">
          {!answered ? (
            <div className="space-y-4 w-full">
              <Button
                className="w-full h-12 bg-she-purple hover:bg-she-purple/90 text-white"
                onClick={handleAnswer}
              >
                Yes, I am safe right now
              </Button>
              <Button
                className="w-full h-12 bg-she-coral hover:bg-she-coral/90 text-white"
                onClick={() => {
                  toast({
                    title: "Emergency Mode Activated",
                    description: "We're here to help. Connecting to emergency services.",
                    variant: "destructive",
                  });
                }}
              >
                No, I need help immediately
              </Button>
            </div>
          ) : (
            <div className="text-center py-4 animate-pulse">
              <p className="text-she-purple font-medium">Safety confirmed!</p>
              <p className="text-sm text-gray-500">Redirecting to login...</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center pb-8">
          <p className="text-xs text-gray-500 max-w-xs text-center">
            SHE-Guardian is designed to provide resources and assistance during emergencies. 
            If you're in immediate danger, please call local emergency services directly.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SafetyQuestion;
