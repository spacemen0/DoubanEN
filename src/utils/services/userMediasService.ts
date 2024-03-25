import {Media, MediaType, StatusType} from "../type";
import {apiUrl} from "../config";

export const getUserRatedAndReviewedMediasByType = async (
  userId: number,
  type: MediaType | "All",
): Promise<Media[]> => {
  let ratedMedias: Media[] = [];
  let reviewedMedias: Media[] = [];
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/media-statuses?mediaType=${type}&userId=${userId}&mediaStatus=Rated`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    console.error("Error fetching Medias:", error);
    throw new Error("Failed to fetch Medias. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch Medias");
  }
  ratedMedias = await response.json();
  try {
    response = await fetch(
      `${apiUrl}/media-statuses?mediaType=${type}&userId=${userId}&mediaStatus=Reviewed`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    console.error("Error fetching Medias:", error);
    throw new Error("Failed to fetch Medias. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch Medias");
  }
  reviewedMedias = await response.json();
  return ratedMedias.concat(reviewedMedias);
};

export const getUserMediasByTypeWithPagination = async (
  userId: number,
  type: MediaType | "All",
  page: number,
  status: StatusType,
  size: number = 5,
): Promise<Media[]> => {
  let response = new Response();
  const url =
    type === "All"
      ? `${apiUrl}/media-statuses?userId=${userId}&page=${page}&size=${size}&mediaStatus=${status}`
      : `${apiUrl}/media-statuses?type=${type}&userId=${userId}&page=${page}&size=${size}&mediaStatus=${status}`;
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
  type: MediaType | "All",
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
    response = await fetch(`${apiUrl}/media-statuses?userId=${userId}`, {
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
