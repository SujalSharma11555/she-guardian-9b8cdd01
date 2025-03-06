
import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock implementation for now
// In a real app, you would integrate with a backend authentication service
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("she-guardian-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
    setInitialized(true);
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      // Mock login implementation
      // In a real app, you would validate credentials against a backend
      if (username.trim() === "" || password.trim() === "") {
        throw new Error("Please enter valid credentials");
      }
      
      // Check if user exists in localStorage (for demo purposes)
      const usersStr = localStorage.getItem("she-guardian-users");
      const users = usersStr ? JSON.parse(usersStr) : {};
      
      if (!users[username] || users[username].password !== password) {
        throw new Error("Invalid username or password");
      }
      
      const mockUser = {
        id: username,
        name: users[username].name,
        email: `${username}@example.com`,
        photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      };
      
      setUser(mockUser);
      localStorage.setItem("she-guardian-user", JSON.stringify(mockUser));
      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "There was a problem with your login. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, username: string, password: string) => {
    setLoading(true);
    try {
      // Validation
      if (name.trim() === "" || username.trim() === "" || password.trim() === "") {
        throw new Error("Please fill in all fields");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      // Mock registration implementation
      // In a real app, you would send this data to a backend
      const usersStr = localStorage.getItem("she-guardian-users");
      const users = usersStr ? JSON.parse(usersStr) : {};
      
      // Check if username already exists
      if (users[username]) {
        throw new Error("Username already exists");
      }
      
      // Store new user
      users[username] = {
        name,
        password,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem("she-guardian-users", JSON.stringify(users));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "There was a problem with your registration. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem("she-guardian-user");
      toast({
        title: "Logout successful",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was a problem with your logout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
