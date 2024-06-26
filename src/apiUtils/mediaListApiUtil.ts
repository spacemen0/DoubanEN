import { apiUrl } from "../utils/config";
import { ListInfo, Media } from "../utils/type.ts";
import { defaultImage } from "../utils/data.ts";

export const getListItemsCount = async (id: number): Promise<number> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-lists/${id}/count`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching Number of List Items");
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
    throw new Error("Error Sending Request");
  }
  if (response.status === 404) throw new Error("Not Exist");

  if (!response.ok) {
    throw new Error("Error Fetching List Items");
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
    throw new Error("Error Sending Request");
  }
  if (response.status === 404) throw new Error("Not Exist");
  if (!response.ok) {
    throw new Error("Error Fetching List");
  }
  const data = await response.json();
  data.username = data["user"]["username"];
  data.userId = data["user"]["id"];
  if (!data.imageUrl) data.imageUrl = "/images/" + defaultImage;
  return data as ListInfo;
};

export const getUserLists = async (userId: number): Promise<ListInfo[]> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-lists?userId=${userId}`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (response.status === 404) return [];
  if (!response.ok) {
    throw new Error("Error Fetching Lists");
  }
  const listInfos = (await response.json()) as ListInfo[];
  listInfos.map((listInfo) => {
    if (!listInfo.imageUrl) listInfo.imageUrl = "/images/" + defaultImage;
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Creating List");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Editing List");
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
    throw new Error("Error Sending Request");
  }
  if (response.status === 400) throw new Error("List or media not exist");
  if (response.status === 409) throw new Error("Duplicated list item");
  if (!response.ok) throw new Error("Error Adding Item List");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Deleting List Item");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Deleting List");
  }
};
