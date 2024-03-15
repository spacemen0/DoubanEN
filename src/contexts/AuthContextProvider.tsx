import React, {FC, useEffect, useState} from "react";
import {expiryTime} from "../utils/config.ts";
import {AuthContext, AuthContextType} from "./AuthContext";
import {User} from "../utils/type.ts";
import {getUser, login, logout, register} from "../utils/apiService.ts";

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

    const [message, setMessage] = useState<string | null>(() =>
        getWithExpiry<string>("message")
    );

    useEffect(() => {
        setWithExpiry("isAuthenticated", isLoggedIn, expiryTime);
        setWithExpiry("user", user, expiryTime);
        setWithExpiry("token", token, expiryTime);
        setWithExpiry("message", message, expiryTime);
    }, [isLoggedIn, user, token, message]);

    const handleLogin = async (username: string, password: string) => {
        const response = await login(username, password);
        if (response.userId) {
            const currentUser = await getUser(response.userId);
            setIsLoggedIn(true);
            setToken(response.token);
            setUser(currentUser);
        } else setMessage("Error logging you in");
    };

    const handleLogout = async (token: string) => {
        await logout(token);
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
        setMessage(null);
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
        } else setMessage("Error registering your new account");
    };

    const handleSetMessage = (message: string) => {
        console.log(message);
        setMessage(message);
    };

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
                    <p className="font-semibold text-center text-lg">{message}</p>
                    <p className="text-center text-sm font-semibold">{`(click me)`}</p>
                </div>
            )}
        </>
    );
};
