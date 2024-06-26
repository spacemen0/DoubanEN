import { AuthResponse, ProfileFormData, User } from "../utils/type";
import { apiUrl } from "../utils/config";

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
    throw new Error("Error Sending Request");
  }
  const data = await response.json();
  if (data["message"] === "User already exist") throw new Error("Conflict");
  if (!response.ok) throw new Error("Error Registering User");

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
    throw new Error("Error Sending Request");
  }
  if (response.status === 401) throw new Error("Unauthorized");
  if (!response.ok) {
    throw new Error("Error Logging In");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Logging Out");
  }
};
export const fetchUser = async (id: number): Promise<User> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/users/${id}`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (response.status === 404) throw new Error("Not Exist");
  if (!response.ok) {
    throw new Error("Error Fetching User Info");
  }
  const data = (await response.json()) as User;
  if (!data.profileImageUrl) data.profileImageUrl = "/images/303";
  return data;
};

export const updateProfile = async (
  id: number,
  token: string,
  formData: ProfileFormData,
): Promise<void> => {
  let response = new Response();
  const requestBody = new FormData();
  formData.bio && requestBody.append("bio", formData.bio);
  formData.username && requestBody.append("username", formData.username);
  formData.password && requestBody.append("password", formData.password);
  formData.image && requestBody.append("image", formData.image);
  const checkPassword = {
    id: id,
    password: formData.oldPassword,
  };
  if (formData.oldPassword && formData.password)
    try {
      response = await fetch(`${apiUrl}/users/check-password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkPassword),
      });
    } catch (error) {
      throw new Error("Error Sending Request");
    }

  if (response.status === 403) throw new Error("Wrong password");
  if (!response.ok) {
    throw new Error("Error Checking Password");
  }
  try {
    response = await fetch(`${apiUrl}/users/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: requestBody,
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (response.status === 404) throw new Error("Not Exist");
  if (!response.ok) {
    throw new Error("Error Updating Profile");
  }
};
