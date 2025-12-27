import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BskyAgent } from '@atproto/api';

interface AuthContextType {
  agent: BskyAgent;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [agent] = useState(() => new BskyAgent({ service: 'https://bsky.social' }));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (identifier: string, password: string) => {
    await agent.login({ identifier, password });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ agent, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
