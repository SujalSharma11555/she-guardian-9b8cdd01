
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Facebook, Mail } from "lucide-react";

const AuthForm: React.FC = () => {
  const { login, loading } = useAuth();

  return (
    <div className="w-full max-w-md mx-auto p-4 fade-in">
      <Card className="glass-card shadow-xl border-she-pink/20 overflow-hidden">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-she-purple to-she-coral bg-clip-text text-transparent">
            Welcome to SHE-Guardian
          </CardTitle>
          <CardDescription>
            Sign in to access your safety tools and emergency features
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            className="bg-[#4285F4] hover:bg-[#4285F4]/90 text-white w-full flex items-center justify-center gap-2 h-12"
            disabled={loading}
            onClick={() => login("google")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chrome"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="21.17" x2="12" y1="8" y2="8" />
              <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
              <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
            </svg>
            Continue with Google
          </Button>
          <Button
            className="bg-[#3b5998] hover:bg-[#3b5998]/90 text-white w-full flex items-center justify-center gap-2 h-12"
            disabled={loading}
            onClick={() => login("facebook")}
          >
            <Facebook size={20} />
            Continue with Facebook
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
