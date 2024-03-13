import { faker } from "@faker-js/faker";
import {
  bookItems,
  generateRandomData,
  movieItems,
  musicItems,
  myItems,
} from "./data";
import { AuthResponse, Media, User } from "./type";

export const fetchCollectionItems = async (
  userId: number,
  type: "Music" | "Movie" | "Book" | "All"
): Promise<Media[]> => {
  // try {
  //   const response = await fetch(`/${type}/${userId}`);
  //   const data = await response.json();
  //   return JSON.parse(data);
  // } catch (error) {
  //   console.error("Error fetching My Collection items:", error);
  //   throw error;
  // }
  console.log(userId);
  if (type === "Music") return musicItems;
  if (type === "Movie") return movieItems;
  if (type === "Book") return bookItems;
  if (type === "All") return myItems;
  throw new Error(`Invalid type: ${type}`);
};

export const getUser = async (id: number): Promise<User> => {
  // try {
  //   const response = await fetch(`${apiUrl}user/${id}`, {
  //     method: "GET",
  //   });
  //   const data = await response.json();
  //   if (response.status === 200) {
  //     return data as User;
  //   } else {
  //     throw data;
  //   }
  // } catch (error) {
  //   console.error("Get user failed:", error);
  //   throw error;
  // }
  console.log(id);
  return {
    ID: 1,
    name: "Spacemen0",
    imageUrl: "",
    role: "Standard",
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut 
      labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
       nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.`,
    memberSince: "2002-10-2",
  };
};

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
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
  return { userId: 1, token: "randomToken" };
};

export const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
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
  return { userId: 1, token: "randomToken" };
};

export const logout = async (token: string) => {
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
  if (token === "randomToken") return;
  throw new Error("Error logging out");
};

export const getMedia = async (
  id: number,
  type: "Music" | "Movie" | "Book"
): Promise<Media> => {
  console.log(id, type);
  if (type === "Music")
    return {
      id: 1,
      title: faker.lorem.words(),
      image: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      author: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
      type: "Music",
      wants: 0,
    };
  else if (type === "Movie")
    return {
      id: 1,
      title: faker.lorem.words(),
      image: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      author: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
      type: "Movie",
      wants: 0,
    };
  else
    return {
      id: 1,
      title: faker.lorem.words(),
      image: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      author: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
      type: "Book",
      wants: 0,
    };
};
