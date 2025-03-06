
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AuthForm: React.FC = () => {
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login(username, password);
        navigate("/dashboard");
      } else {
        await register(name, username, password);
        setIsLogin(true);
        toast({
          title: "Registration successful",
          description: "Please log in with your new credentials",
        });
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };
  
  return (
    <Card className="glass-card shadow-lg border-she-pink/20 max-w-sm mx-auto">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="w-16 h-16 mb-2">
          <img 
            src="/lovable-uploads/31aeb8e2-e1df-4f50-a065-45545bf03094.png" 
            alt="SHE-Guardian Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <CardTitle className="text-2xl text-center text-she-purple">SHE-Guardian</CardTitle>
        <CardDescription className="text-center">
          {isLogin ? "Sign in to access your safety tools" : "Create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                type="text" 
                placeholder="Enter your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username"
              type="text" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-she-purple hover:bg-she-purple/90 text-white"
            disabled={loading}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          variant="link" 
          onClick={() => setIsLogin(!isLogin)}
          className="text-she-purple"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </Button>
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
