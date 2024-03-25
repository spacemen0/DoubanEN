import {apiUrl} from "../config";
import {ListInfo, Media} from "../type";

export const getListItemsCount = async (id: number): Promise<number> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-lists/${id}/count`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Reviews Count:", error);
    throw new Error("Failed to fetch Reviews Count. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch Reviews Count");
  }
  return await response.json();
};
export const getAllListItems = async (
  id: number,
  page: number,
): Promise<Media[]> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-lists/${id}?page=${page}&size=5`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Reviews Count:", error);
    throw new Error("Failed to fetch Reviews Count. Please try again later.");
  }
  if (response.status === 404) throw new Error("Not Exist");

  if (!response.ok) {
    throw new Error("Failed to fetch Reviews Count");
  }
  return await response.json();
};
export const getListInfo = async (id: number): Promise<ListInfo> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-lists/${id}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Reviews Count:", error);
    throw new Error("Failed to fetch Reviews Count. Please try again later.");
  }
  if (response.status === 404) throw new Error("Not Exist");
  if (!response.ok) {
    throw new Error("Failed to fetch Reviews Count");
  }
  const data = await response.json();
  data.username = data["user"]["username"];
  data.userId = data["user"]["id"];
  return data as ListInfo;
};

export const getUserLists = async (userId: number): Promise<ListInfo[]> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-lists?userId=${userId}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Reviews Count:", error);
    throw new Error("Failed to fetch Reviews Count. Please try again later.");
  }
  if (response.status === 404) return [];
  if (!response.ok) {
    throw new Error("Failed to fetch Reviews Count");
  }
  return (await response.json()) as ListInfo[];
};

export const createList = async (
  userId: number,
  title: string,
  description: string,
) => {
  const requestBody = {
    user: {
      id: userId,
    },
    title: title,
    description: description,
  };
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    console.error("Failed to create new list:", error);
    throw error;
  }
  if (!response.ok) {
    throw new Error("Failed to create new list");
  }
};

export const addMediaToList = async (listId: number, mediaId: number) => {
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/media-lists/${listId}/add-media?mediaId=${mediaId}`,
      {
        method: "POST",
      },
    );
  } catch (error) {
    console.error("Failed to create new list:", error);
    throw error;
  }
  if (!response.ok) {
    throw new Error("Failed to create new list");
  }
};
