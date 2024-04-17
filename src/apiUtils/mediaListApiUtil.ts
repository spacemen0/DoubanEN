import { apiUrl } from "../utils/config";
import { ListInfo, Media } from "../utils/type.ts";

export const getListItemsCount = async (id: number): Promise<number> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-lists/${id}/count`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Fetch reviews count error");
  }
  if (!response.ok) {
    throw new Error("Response error");
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
    console.error("Error fetching Reviews Count");
    throw new Error("Failed to fetch Reviews Count. Please try again later.");
  }
  if (response.status === 404) throw new Error("Not Exist");

  if (!response.ok) {
    throw new Error("Response error");
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
    throw new Error("Get list info error");
  }
  if (response.status === 404) throw new Error("Not Exist");
  if (!response.ok) {
    throw new Error("Response error");
  }
  const data = await response.json();
  data.username = data["user"]["username"];
  data.userId = data["user"]["id"];
  if (!data.imageUrl) data.imageUrl = "/images/753";
  return data as ListInfo;
};

export const getUserLists = async (userId: number): Promise<ListInfo[]> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-lists?userId=${userId}`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Get user lists error");
  }
  if (response.status === 404) return [];
  if (!response.ok) {
    throw new Error("Response error");
  }
  const listInfos = (await response.json()) as ListInfo[];
  listInfos.map((listInfo) => {
    if (!listInfo.imageUrl) listInfo.imageUrl = "/images/753";
    return listInfo;
  });
  return listInfos;
};

export const createList = async (
  userId: number,
  title: string,
  description: string,
  token: string,
  image: File,
): Promise<ListInfo> => {
  const requestBody = new FormData();
  requestBody.append("title", title);
  requestBody.append("description", description);
  requestBody.append("userId", userId.toString());
  requestBody.append("image", image);
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-lists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: requestBody,
    });
  } catch (error) {
    console.error("create new list error", error);
    throw error;
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  return await response.json();
};

export const editList = async (
  userId: number,
  id: number,
  title: string,
  description: string,
  token: string,
  image?: File,
): Promise<ListInfo> => {
  const requestBody = new FormData();
  requestBody.append("title", title);
  requestBody.append("description", description);
  requestBody.append("userId", userId.toString());
  image && requestBody.append("image", image);
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-lists/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: requestBody,
    });
  } catch (error) {
    console.error("edit list error", error);
    throw error;
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  return await response.json();
};

export const addMediaToList = async (
  listId: number,
  mediaId: number,
  token: string,
) => {
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/media-lists/${listId}/add-media?mediaId=${mediaId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw new Error("Error add media to list");
  }
  if (response.status === 400) throw new Error("List or media not exist");
  if (response.status === 409) throw new Error("Duplicated list item");
  if (!response.ok) throw new Error("Response error");
};

export const removeMediaFromList = async (
  listId: number,
  mediaId: number,
  token: string,
) => {
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/media-lists/${listId}/delete-media?mediaId=${mediaId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.error("Remove media to list error");
    throw error;
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
};

export const deleteList = async (listId: number, token: string) => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-lists/${listId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Delete list error");
    throw error;
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
};
