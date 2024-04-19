import { Media, MediaStatus, MediaType, StatusType } from "../utils/type";
import { apiUrl } from "../utils/config";

export const getMediasByTypeAndUserStatusWithPagination = async (
  userId: number,
  type: MediaType,
  status: StatusType,
  page: number,
  size: number = 5,
): Promise<Media[]> => {
  let ratedMedias: Media[] = [];
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/medias?mediaType=${type}&userId=${userId}&mediaStatus=${status}&page=${page}&size=${size}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    throw new Error("Failed to fetch Medias. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch Medias");
  }
  const data = await response.json();
  ratedMedias = data["content"] as Media[];
  return ratedMedias;
};

export const getMediaStatusesByTypeAndUserIdWithPagination = async (
  userId: number,
  type: MediaType,
  status: StatusType,
  page: number,
  size: number = 5,
): Promise<MediaStatus[]> => {
  let ratedMediaStatuses: MediaStatus[] = [];
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/media-statuses?mediaType=${type}&userId=${userId}&mediaStatus=${status}&page=${page}&size=${size}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    throw new Error("Failed to fetch Medias. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch Media Statuses");
  }
  const data = await response.json();
  ratedMediaStatuses = data["content"] as MediaStatus[];
  return ratedMediaStatuses;
};

export const getUserMediasByTypeWithPagination = async (
  userId: number,
  type: MediaType,
  page: number,
  status: StatusType,
  size: number = 5,
): Promise<Media[]> => {
  let response = new Response();
  const url =
    type === "All"
      ? `${apiUrl}/medias?userId=${userId}&page=${page}&size=${size}&mediaStatus=${status}`
      : `${apiUrl}/medias?type=${type}&userId=${userId}&page=${page}&size=${size}&mediaStatus=${status}`;
  try {
    response = await fetch(url, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Medias:", error);
    throw new Error("Failed to fetch Medias. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch Medias");
  }
  const data = await response.json();
  return data["content"];
};

export const getUserMediaCountByType = async (
  userId: number,
  type: MediaType,
  status: StatusType,
): Promise<number> => {
  let response = new Response();
  const url =
    type === "All"
      ? `${apiUrl}/media-statuses/count?userId=${userId}&mediaStatus=${status}`
      : `${apiUrl}/media-statuses/count?type=${type}&userId=${userId}&mediaStatus=${status}`;
  try {
    response = await fetch(url, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Media count:", error);
    throw new Error("Failed to fetch Media count. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch Media count");
  }
  return await response.json();
};

export const getUserCurrentOn = async (userId: number): Promise<Media[]> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/medias?userId=${userId}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Medias:", error);
    throw new Error("Failed to fetch Medias. Please try again later.");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch Medias");
  }
  return await response.json();
};
