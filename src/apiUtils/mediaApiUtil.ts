import { Media, MediaType } from "../utils/type";
import { apiUrl } from "../utils/config";
import { processMediaJson } from "../utils/helper.ts";

export const getMedia = async (id: number): Promise<Media> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media/${id}`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (response.status === 404) throw new Error("Not Exist");
  if (!response.ok) {
    throw new Error("Error Fetching Media");
  }
  const data = await response.json();
  return processMediaJson(data as Media);
};
export const getAllMediaByType = async (
  type: MediaType,
  page: number,
): Promise<Media[]> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media?type=${type}&page=${page}&size=5`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching Media");
  }
  const res = await response.json();
  return res["content"];
};
export const getAllMediaCountByType = async (
  type: MediaType,
): Promise<number> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media/count/${type}`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  return await response.json();
};

export const addMedia = async (
  media: Media,
  token: string,
  image: File,
): Promise<void> => {
  let response = new Response();
  const requestBody = new FormData();
  requestBody.append("type", media.type);
  requestBody.append("description", media.description);
  requestBody.append("title", media.title);
  requestBody.append("authorId", media.author.toString());
  requestBody.append("releaseDate", media.releaseDate);
  requestBody.append("genre", media.genre);
  requestBody.append("average", media.average.toString());
  requestBody.append("ratings", media.ratings.toString());
  requestBody.append("wants", media.wants.toString());
  requestBody.append("doings", media.doings.toString());
  requestBody.append("additional", media.additional);
  requestBody.append("imageUrl", "placeHolder");
  requestBody.append("image", image);
  try {
    response = await fetch(`${apiUrl}/media`, {
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
    throw new Error("Error Adding Media");
  }
  return;
};

export const deleteMedia = async (id: number, token: string): Promise<void> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Deleting Media");
  }
  return;
};
