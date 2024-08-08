import axiosInstance from "@/hooks/services/auth/axiosInstance";
import { getAccessToken, removeTokens } from "@/hooks/services/auth/useAuth";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextProps {
  user: {
    username: string
    role: string
  } | null;
  setUser: (user: { username: string, role: string } | null) => void;
}

const initialAuthContext: AuthContextProps = {
  user: null,
  setUser: () => { },
};

export const AuthContext = createContext<AuthContextProps>(initialAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<{ username: string, role: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        return;
      }
      try {
        const response = await axiosInstance.get('/auth/me');
        setUserState({username: response.data.username, role: response.data.role});
      } catch (error) {
        console.error('Error fetching user on initial load:', error);
        removeTokens();
      }
    };

    fetchUser();
  }, []);

  const setUser = (user: { username: string; role: string } | null) => {
    setUserState(user);
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}