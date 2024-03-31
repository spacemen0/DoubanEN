import { AuthResponse, User } from "../type";
import { apiUrl } from "../config";
import { generateRandomData } from "../data";

export const register = async (
  username: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const requestBody = {
    username: username,
    email: email,
    password: password,
  };
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    throw new Error("Register error");
  }
  const data = await response.json();
  if (data["message"] === "User already exist") throw new Error("Conflict");
  if (!response.ok) throw new Error("Failed to register");

  return data;
};
export const login = async (
  username: string,
  password: string,
): Promise<AuthResponse> => {
  const requestBody = {
    username: username,
    password: password,
  };
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    throw new Error("Login error");
  }
  if (response.status === 401) throw new Error("Unauthorized");
  if (!response.ok) {
    throw new Error("Response error");
  }

  return await response.json();
};
export const logout = async (token: string): Promise<void> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Logout error");
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
};
export const fetchUser = async (id: number): Promise<User> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/users/${id}`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Fetch user error");
  }
  if (response.status === 404) throw new Error("Not Exist");
  if (!response.ok) {
    throw new Error("Response error");
  }
  const data = (await response.json()) as User;
  if (!data.profileImage) data.profileImage = generateRandomData().src;
  return data;
};
