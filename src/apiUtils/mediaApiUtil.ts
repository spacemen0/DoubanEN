import { Media, MediaType } from "../utils/type";
import { apiUrl } from "../utils/config";
import { processMediaJson } from "../utils/helper.ts";

export const getMedia = async (id: number): Promise<Media> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/medias/${id}`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Fetch media error");
  }
  if (response.status === 404) throw new Error("Not Exist");
  if (!response.ok) {
    throw new Error("Response error");
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
    response = await fetch(
      `${apiUrl}/medias?type=${type}&page=${page}&size=5`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    throw new Error("Fetch Medias error");
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  const res = await response.json();
  return res["content"];
};
export const getAllMediaCountByType = async (
  type: MediaType,
): Promise<number> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/medias/count/${type}`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Fetch Medias Count error");
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
    response = await fetch(`${apiUrl}/medias`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: requestBody,
    });
  } catch (error) {
    throw new Error("Create Media error");
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  return;
};
