import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import logger from '../utils/logger';
import config from '../config';

interface User {
  id: number;
  username: string;
  role: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth חייב להיות בתוך AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        logger.info('בודק אימות...');
        const response = await axios.get(`${config.api.baseURL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = {
          ...response.data,
          isAdmin: response.data.role === 'admin'
        };
        setUser(userData);
        logger.info('אימות הצליח');
      } catch (error) {
        logger.error('אימות נכשל:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      logger.info('מנסה להתחבר...', { username });
      const response = await axios.post(`${config.api.baseURL}/api/auth/login`, { username, password });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      const enhancedUser = {
        ...userData,
        isAdmin: userData.role === 'admin'
      };
      setUser(enhancedUser);
      logger.info('התחברות הצליחה');
    } catch (error) {
      logger.error('התחברות נכשלה:', error);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      logger.info('מנסה להירשם...', { username });
      await axios.post(`${config.api.baseURL}/api/auth/register`, { username, password });
      logger.info('הרשמה הצליחה');
    } catch (error) {
      logger.error('הרשמה נכשלה:', error);
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    login,
    register,
    logout: () => {
      logger.info('מתנתק...');
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export type { AuthContextType, User };
export { AuthContext };
export default useAuth; 