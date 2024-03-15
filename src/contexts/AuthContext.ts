import { User } from "../utils/type.ts";
import React, { useContext } from "react";

export interface AuthContextType {
  isLoggedIn: boolean | null;
  user: User | null;
  token: string | null;
  message: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: (token: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
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
