
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AuthForm: React.FC = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [showSafetyCheck, setShowSafetyCheck] = useState(false);
  
  const handleGoogleLogin = async () => {
    try {
      await login("google");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  
  const handleFacebookLogin = async () => {
    try {
      await login("facebook");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  
  return (
    <Card className="glass-card shadow-lg border-she-pink/20 max-w-sm mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-she-purple">SHE-Guardian</CardTitle>
        <CardDescription className="text-center">
          Sign in to access your safety tools
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button
            className="w-full bg-white text-black border hover:bg-gray-100"
            disabled={loading}
            onClick={handleGoogleLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              className="mr-2"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </Button>
          
          <Button
            className="w-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
            disabled={loading}
            onClick={handleFacebookLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              className="mr-2"
            >
              <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
            </svg>
            Continue with Facebook
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-center text-sm text-gray-500">
          By signing in, you agree to our 
          <a href="#" className="text-she-purple hover:underline"> Terms of Service</a> and 
          <a href="#" className="text-she-purple hover:underline"> Privacy Policy</a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
