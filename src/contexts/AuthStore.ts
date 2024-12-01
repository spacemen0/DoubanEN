import { User } from "../utils/type.ts";
import { create } from "zustand/index";
import { fetchUser, login, logout, register } from "../apiUtils/userApiUtil.ts";
import { expiryTime } from "../utils/config.ts";

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

interface AuthStore {
  user: User | null;
  token: string | null;
  message: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  setMessage: (message: string) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: getWithExpiry<User>("user"),
  token: getWithExpiry<string>("token"),
  message: null,

  login: async (username, password) => {
    const response = await login(username, password);
    if (response.userId) {
      const currentUser = await fetchUser(response.userId);
      set({
        token: response.token,
        user: currentUser,
      });
      setWithExpiry("user", currentUser, expiryTime);
      setWithExpiry("token", response.token, expiryTime);
    } else {
      throw new Error("Error logging you in");
    }
  },

  logout: async () => {
    const { token } = get();
    if (token) {
      await logout(token);
    }
    set({ user: null, token: null, message: null });
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  },

  refresh: async () => {
    const { user } = get();
    if (user) {
      const updatedUser = await fetchUser(user.id);
      set({ user: updatedUser });
      setWithExpiry("user", updatedUser, expiryTime);
    }
  },

  register: async (username, email, password) => {
    const response = await register(username, email, password);
    if (response.userId) {
      const newUser = await fetchUser(response.userId);
      set({
        token: response.token,
        user: newUser,
      });
      setWithExpiry("user", newUser, expiryTime);
      setWithExpiry("token", response.token, expiryTime);
    } else {
      throw new Error("Error registering your new account");
    }
  },

  setMessage: (message) => {
    set({ message });
  },
}));
