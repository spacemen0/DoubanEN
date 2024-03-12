import { Media } from "./type";

export const fetchMyCollectionItems = async (
  userId: number
): Promise<Media[]> => {
  try {
    const response = await fetch(`/api/my-collection/${userId}`);
    const data = await response.json();
    return JSON.parse(data);
  } catch (error) {
    console.error("Error fetching My Collection items:", error);
    throw error;
  }
};
