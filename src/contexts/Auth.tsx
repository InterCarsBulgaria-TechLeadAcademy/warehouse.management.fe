import React, { createContext, ReactNode, useState } from "react";

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
  const [user, setUser] = useState<{ username: string, role: string } | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}