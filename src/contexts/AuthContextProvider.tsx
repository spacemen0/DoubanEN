import { useState, useEffect, FC } from "react";
import { expiryTime } from "../config";
import { AuthContextType } from "./AuthContext";
import { AuthContext } from "./AuthContext";
import { User } from "../type";
import { getUser, login, logout, register } from "../apiService";

function setWithExpiry<T>(key: string, value: T, ttl: number): void {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry<T>(key: string): T | null {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);

  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(() =>
    getWithExpiry<boolean>("isAuthenticated")
  );
  const [user, setUser] = useState<User | null>(() =>
    getWithExpiry<User>("user")
  );
  const [token, setToken] = useState<string | null>(() =>
    getWithExpiry<string>("token")
  );

  const [error, setError] = useState<string | null>(() =>
    getWithExpiry<string>("error")
  );

  useEffect(() => {
    setWithExpiry("isAuthenticated", isLoggedIn, expiryTime);
    setWithExpiry("user", user, expiryTime);
    setWithExpiry("token", token, expiryTime);
    setWithExpiry("error", error, expiryTime);
  }, [isLoggedIn, user, token, error]);

  const handleLogin = async (username: string, password: string) => {
    const response = await login(username, password);
    if (response.userId) {
      const currentUser = await getUser(response.userId);
      setIsLoggedIn(true);
      setToken(response.token);
      setUser(currentUser);
    }
  };

  const handleLogout = async (token: string) => {
    logout(token);
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    setError(null);
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    const response = await register(username, email, password);
    if (response.userId) {
      const newUser = await getUser(response.userId);
      setIsLoggedIn(true);
      setToken(response.token);
      setUser(newUser);
    }
  };

  const contextValue: AuthContextType = {
    isLoggedIn,
    user,
    token,
    error,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
