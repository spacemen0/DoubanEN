import { Media, MediaStatus, MediaType, StatusType } from "../utils/type";
import { apiUrl } from "../utils/config";

export const getMediaByTypeAndUserStatusWithPagination = async (
  userId: number,
  type: MediaType,
  status: StatusType,
  page: number,
  size: number = 5,
): Promise<Media[]> => {
  let ratedMedia: Media[] = [];
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/media?mediaType=${type}&userId=${userId}&mediaStatus=${status}&page=${page}&size=${size}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching Media");
  }
  const data = await response.json();
  ratedMedia = data["content"] as Media[];
  return ratedMedia;
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching Media Statuses");
  }
  const data = await response.json();
  ratedMediaStatuses = data["content"] as MediaStatus[];
  return ratedMediaStatuses;
};

export const getUserMediaByTypeWithPagination = async (
  userId: number,
  type: MediaType,
  page: number,
  status: StatusType,
  size: number = 5,
): Promise<Media[]> => {
  let response = new Response();
  const url =
    type === "All"
      ? `${apiUrl}/media?userId=${userId}&page=${page}&size=${size}&mediaStatus=${status}`
      : `${apiUrl}/media?type=${type}&userId=${userId}&page=${page}&size=${size}&mediaStatus=${status}`;
  try {
    response = await fetch(url, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching User Media");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching Number of User Media");
  }
  return await response.json();
};

export const getUserCurrentOn = async (userId: number): Promise<Media[]> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media?userId=${userId}`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }

  if (!response.ok) {
    throw new Error("Error Fetching User's Current On");
  }
  return await response.json();
};
