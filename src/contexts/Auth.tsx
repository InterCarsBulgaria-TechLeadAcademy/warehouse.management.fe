import { getWarehouseManagementApi } from "@/services/generated-api";
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
      try {
        const response = await getWarehouseManagementApi().getApiUserMe()
        console.log(response);

        setUserState({ username: response.userName, role: response.roles[0] });
      } catch (error) {
        console.error('Error fetching user on initial load:', error);
        return
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