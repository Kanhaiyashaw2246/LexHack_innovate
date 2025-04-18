
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, LoginCredentials, SignupCredentials, AuthResponse } from "@/types";
import { mockUsers } from "@/lib/mockData";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  signup: (credentials: SignupCredentials) => Promise<User>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('leximax_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('leximax_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const login = async (credentials: LoginCredentials): Promise<User> => {
    setIsLoading(true);
    
    try {
      // Mock login request - in a real app, this would be an API call
      // This simulates a network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user = mockUsers.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error("Invalid email or password");
      }
      
      // Update lastLoginDate
      const updatedUser = {
        ...user,
        lastLoginDate: new Date().toISOString()
      };
      
      setCurrentUser(updatedUser);
      return updatedUser;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<User> => {
    setIsLoading(true);
    
    try {
      // Mock signup request - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user with email already exists
      const existingUser = mockUsers.find(u => u.email === credentials.email);
      if (existingUser) {
        throw new Error("Email already in use");
      }
      
      // Create new user
      const newUser: User = {
        id: `user${mockUsers.length + 1}`,
        username: credentials.username,
        email: credentials.email,
        avatar: credentials.avatar,
        xp: 0,
        level: 1,
        streakDays: 0,
        lastLoginDate: new Date().toISOString(),
        joinDate: new Date().toISOString(),
        completedMaxims: [],
        badges: []
      };
      
      // In a real app, we would add this user to the database
      // For our mock, we just set the current user
      setCurrentUser(newUser);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('leximax_user');
    setCurrentUser(null);
  };

  const updateUser = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
        signup,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
