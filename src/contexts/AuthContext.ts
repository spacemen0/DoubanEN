import { User } from "../utils/type";
import React, { useContext } from "react";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  message: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: (token: string) => Promise<void>;
  refresh: () => void;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  setMessage: (message: string) => void;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
