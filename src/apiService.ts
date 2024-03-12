import { apiUrl } from "./config";
import { bookItems, movieItems, musicItems, myItems } from "./data";
import { Media, User } from "./type";

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

export const getUser = async (token: string): Promise<User> => {
  try {
    const response = await fetch(`${apiUrl}user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return data as User;
    } else {
      throw data;
    }
  } catch (error) {
    console.error("Get user failed:", error);
    throw error;
  }
};
