import React, { FC, useCallback, useEffect, useState } from "react";
import { expiryTime } from "../utils/config.ts";
import { AuthContext, AuthContextType } from "./AuthContext";
import { User } from "../utils/type.ts";
import { fetchUser, login, logout, register } from "../apiUtils/userApiUtil.ts";

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
  const [user, setUser] = useState<User | null>(() =>
    getWithExpiry<User>("user"),
  );
  const [token, setToken] = useState<string | null>(() =>
    getWithExpiry<string>("token"),
  );

  const [message, setMessage] = useState<string | null>("");

  useEffect(() => {
    user && setWithExpiry("user", user, expiryTime);
    token && setWithExpiry("token", token, expiryTime);
  }, [user, token]);

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      const response = await login(username, password);
      if (response.userId) {
        const currentUser = await fetchUser(response.userId);
        setToken(response.token);
        setUser(currentUser);
      } else {
        throw new Error("Error logging you in");
      }
    },
    [],
  );

  const handleLogout = useCallback(async (token: string) => {
    await logout(token);
    setUser(null);
    setToken(null);
    setMessage(null);
  }, []);

  const handleRegister = useCallback(
    async (username: string, email: string, password: string) => {
      const response = await register(username, email, password);

      if (response.userId) {
        const newUser = await fetchUser(response.userId);
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
          px-4 py-2 md:py-4 rounded-md bg-gray-800  text-white transition-opacity duration-1000 opacity-100"
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
