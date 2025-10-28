import React,  { createContext, useContext, useState, useEffect,  } from 'react';
import type { ReactNode } from 'react';
import api from '../utils/api';
import type { User } from '../types';

// Define the shape of the context data
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean; // To handle initial auth check
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider component
interface AuthProviderProps {
  children: ReactNode; // Allows this component to wrap other components
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Start as true

  // This effect runs on app load to validate the token
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // Set the token for all future api requests
        api.defaults.headers.common['x-auth-token'] = storedToken;
        try {
          const res = await api.get<User>('/auth/me');
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setLoading(false); // Finished loading
    };

    loadUser();
  }, []);

  const login = async (token: string) => {
    localStorage.setItem('token', token);
    api.defaults.headers.common['x-auth-token'] = token;
    setToken(token);
    try {
      const res = await api.get<User>('/auth/me');
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      // Handle error if /me fails after login
      console.error("Failed to fetch user after login", err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['x-auth-token'];
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, loading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};