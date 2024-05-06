import React, { FC, useCallback, useEffect, useRef, useState } from "react";
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
  sessionStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry<T>(key: string): T | null {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);

  const now = new Date();
  if (now.getTime() > item.expiry) {
    sessionStorage.removeItem(key);
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

  const [message, setMessage] = useState<string>("");

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

  const refreshUser = useCallback(async () => {
    if (user) {
      setUser(await fetchUser(user.id));
    }
  }, [user]);

  const handleLogout = useCallback(async (token: string) => {
    await logout(token);
    setUser(null);
    setToken(null);
    setMessage("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
    refresh: refreshUser,
    setMessage: handleSetMessage,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <MessageBox message={message} setMessage={setMessage} />
      {children}
    </AuthContext.Provider>
  );
};

const MessageBox = ({
  message,
  setMessage,
}: {
  message: string;
  setMessage: (message: string) => void;
}) => {
  const messageBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        messageBoxRef.current &&
        !messageBoxRef.current.contains(e.target as Node)
      ) {
        messageBoxRef.current.classList.remove("opacity-80");
        messageBoxRef.current.classList.add("opacity-0");
        const timer = setTimeout(() => {
          setMessage("");
          clearTimeout(timer);
        }, 2000);
      }
    };
    document.addEventListener("mouseover", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseover", handleOutsideClick);
    };
  }, [setMessage]);

  return (
    <>
      {message !== "" && (
        <div
          ref={messageBoxRef}
          className="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform
          px-4 py-2 md:py-4 rounded-md bg-gray-500 text-white transition-opacity duration-[2000ms] opacity-80"
        >
          <p className="text-center text-xl font-semibold">{message}</p>
        </div>
      )}
    </>
  );
};
