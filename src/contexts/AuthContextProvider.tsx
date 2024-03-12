import { useState, useEffect, FC } from "react";
import { expiryTime } from "../config";
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

  // const getUser = async (token: string) => {
  //   try {
  //     const response = await fetch(`${apiUrl}user`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       const data = await response.json();
  //       setUser(data);
  //     } else {
  //       const data = await response.json();
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.error("Get user failed:", error);
  //   }
  // };

  const login = async (username: string, password: string) => {
    // try {
    //   const url = `${apiUrl}login`;
    //   const body = { username, password };
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   });
    //   if (response.status === 200) {
    //     const data = await response.json();
    //     setIsLoggedIn(true);
    //     setToken(data.token);
    //     getUser(data.token);
    //   } else {
    //     const data = await response.json();
    //     console.log(data.message);
    //     setError(data.message);
    //   }
    // } catch (error) {
    //   setError(error as string);
    // }
    console.log(username, password);
    setIsLoggedIn(true);
    setUser({
      ID: 1,
      name: "Spacemen0",
      imageUrl: "",
      role: "Standard",
      memberSince: "2002-10-2",
    });
    setToken("data.token");
  };

  const logout = async (token: string) => {
    // try {
    //   const response = await fetch(`${apiUrl}logout`, {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (response.status === 204) {
    //     setIsLoggedIn(false);
    //     setUser(null);
    //     setToken(null);
    //     setError(null);
    //   } else {
    //     const data = await response.json();
    //     setError(data.message);
    //   }
    // } catch (error) {
    //   setError(error as string);
    // }
    console.log(token);
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    setError(null);
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    // try {
    //   const url = `${apiUrl}login`;
    //   const body = { username, password, email };
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   });

    //   if (response.status === 200) {
    //     const data = await response.json();
    //     setIsLoggedIn(true);
    //     setToken(data.token);
    //     getUser(data.token);
    //   } else {
    //     const data = await response.json();
    //     console.log(data.message);
    //     setError(data.message);
    //   }
    // } catch (error) {
    //   setError(error as string);
    // }
    console.log(username, email, password);
    setIsLoggedIn(true);
    setToken("token");
    setUser({
      ID: 1,
      name: "Spacemen0",
      imageUrl: "",
      role: "Standard",
      memberSince: "2002-10-2",
    });
  };

  const contextValue: AuthContextType = {
    isLoggedIn,
    user,
    token,
    error,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
