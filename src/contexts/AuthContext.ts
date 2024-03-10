import { User } from "../type";
import React, { useContext } from "react";

export interface AuthContextType {
  isLoggedIn: boolean | null;
  user: User | null; // Replace 'any' with the type of userInfo
  token: string | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; error: string }>;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
