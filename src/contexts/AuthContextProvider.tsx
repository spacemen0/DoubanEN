import React, { FC, useCallback, useEffect, useState } from "react";
import { expiryTime } from "../utils/config.ts";
import { AuthContext, AuthContextType } from "./AuthContext";
import { User } from "../utils/type.ts";
import {
  getUser,
  login,
  logout,
  register,
} from "../utils/services/authService.ts";

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
    getWithExpiry<boolean>("isAuthenticated"),
  );
  const [user, setUser] = useState<User | null>(() =>
    getWithExpiry<User>("user"),
  );
  const [token, setToken] = useState<string | null>(() =>
    getWithExpiry<string>("token"),
  );

  const [message, setMessage] = useState<string | null>(() =>
    getWithExpiry<string>("message"),
  );

  useEffect(() => {
    isLoggedIn && setWithExpiry("isAuthenticated", isLoggedIn, expiryTime);
    user && setWithExpiry("user", user, expiryTime);
    token && setWithExpiry("token", token, expiryTime);
    message && setWithExpiry("message", message, expiryTime);
  }, [isLoggedIn, user, token, message]);

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      let response;
      try {
        response = await login(username, password);
      } catch (error) {
        console.log(error);
        throw error;
      }
      if (response.userId) {
        const currentUser = await getUser(response.userId);
        setIsLoggedIn(true);
        setToken(response.token);
        setUser(currentUser);
      } else {
        throw new Error("Error logging you in");
      }
    },
    [],
  );

  const handleLogout = useCallback(async (token: string) => {
    try {
      await logout(token);
      setIsLoggedIn(false);
      setUser(null);
      setToken(null);
      setMessage(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  const handleRegister = useCallback(
    async (username: string, email: string, password: string) => {
      let response;
      try {
        response = await register(username, email, password);
      } catch (error) {
        console.log(error);
        throw error;
      }
      if (response.userId) {
        const newUser = await getUser(response.userId);
        setIsLoggedIn(true);
        setToken(response.token);
        setUser(newUser);
      } else {
        throw new Error("Error registering your new account");
      }
    },
    [],
  );

  const handleSetMessage = useCallback((message: string) => {
    setMessage(message);
  }, []);

  const contextValue: AuthContextType = {
    isLoggedIn,
    user,
    token,
    message: message,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    setMessage: handleSetMessage,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <MessageBox
        message={message}
        onHover={(e) => {
          e.currentTarget.classList.remove("opacity-100");
          e.currentTarget.classList.add("opacity-0");
          const timer = setTimeout(() => {
            setMessage(null);
            clearTimeout(timer);
          }, 1000);
        }}
      />
      {children}
    </AuthContext.Provider>
  );
};

const MessageBox = ({
  message,
  onHover,
}: {
  message: string | null;
  onHover: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <>
      {message && (
        <div
          className="z-50 fixed top-1/4 left-1/2 transform -translate-x-1/2
          px-4 py-4 rounded-md bg-Neutral border text-white transition-opacity duration-1000 opacity-100"
          onMouseEnter={(e) => {
            onHover(e);
          }}
        >
          <p className="text-center text-lg font-semibold">{message}</p>
          <p className="text-center text-sm font-semibold">{`(click me)`}</p>
        </div>
      )}
    </>
  );
};
