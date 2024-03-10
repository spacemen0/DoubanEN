import { useState, useEffect, FC } from "react";
import { apiUrl, expiryTime } from "../config";
import { AuthContextType } from "./AuthContext";
import { AuthContext } from "./AuthContext";
import { User } from "../type";

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() =>
    getWithExpiry<boolean>("isAuthenticated")
  );
  const [user, setUser] = useState<User | null>(() =>
    getWithExpiry<User>("user")
  );
  const [token, setToken] = useState<string | null>(() =>
    getWithExpiry<string>("token")
  );

  useEffect(() => {
    setWithExpiry("isAuthenticated", isAuthenticated, expiryTime);
    setWithExpiry("user", user, expiryTime);
    setWithExpiry("token", token, expiryTime);
  }, [isAuthenticated, user, token]);

  const login = async (username: string, password: string) => {
    try {
      const url = `${apiUrl}user-login/username`;
      const body = { username, password };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        const data = await response.json();
        setIsAuthenticated(true);
        setToken(data);
        getUser(data);
        return { success: true, error: null };
      } else {
        const data = await response.json();
        console.log(data);
        return { success: false, error: data };
      }
    } catch (error) {
      return { success: false, error: error };
    }
  };

  const getUser = async (token: string) => {
    try {
      const response = await fetch(`${apiUrl}get-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Get user info failed:", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  const contextValue: AuthContextType = {
    isLoggedIn: isAuthenticated || false,
    user,
    token: token || "",
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
