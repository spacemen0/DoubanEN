import {apiUrl} from "../config";
import {MediaStatus, MediaType} from "../type";

export const getMediaStatus = async (
  userId: number,
  mediaId: number,
): Promise<MediaStatus> => {
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/media-statuses?userId=${userId}&mediaId=${mediaId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    console.error("Error fetching Medias:", error);
    throw new Error("Failed to fetch Medias. Please try again later.");
  }
  if (response.status == 404) return {score: 0, status: "None"};
  if (!response.ok) {
    throw new Error("Failed to fetch Medias");
  }
  return await response.json();
};
export const setWishlist = async (
  userId: number,
  mediaId: number,
  type: MediaType,
) => {
  const requestBody = {
    userId: userId,
    mediaId: mediaId,
    type: type,
    status: "Wishlist",
  };
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-statuses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    console.error("Failed to set wishlist:", error);
    throw error;
  }
  if (!response.ok) {
    throw new Error("Failed to set wishlist");
  }
};
export const cancelWishlist = async (id: number) => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-statuses/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to set wishlist:", error);
    throw error;
  }
  if (!response.ok) {
    throw new Error("Failed to set wishlist");
  }
};
export const setDoing = async (
  userId: number,
  mediaId: number,
  type: MediaType,
) => {
  const requestBody = {
    userId: userId,
    mediaId: mediaId,
    type: type,
    status: "Doing",
  };
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-statuses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    console.error("Failed to set wishlist:", error);
    throw error;
  }
  if (!response.ok) {
    throw new Error("Failed to set wishlist");
  }
};
export const cancelDoing = async (id: number) => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-statuses/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to set wishlist:", error);
    throw error;
  }
  if (!response.ok) {
    throw new Error("Failed to set wishlist");
  }
};
export const submitRating = async (
  userId: number,
  score: number,
  mediaId: number,
  type: MediaType,
): Promise<boolean> => {
  const requestBody = {
    userId: userId,
    mediaId: mediaId,
    type: type,
    status: "Rated",
    score: score,
  };
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-statuses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    console.error("Failed to submit Rating:", error);
    throw error;
  }
  await response.json();
  if (!response.ok) {
    throw new Error("Failed to submit Rating");
  }
  return true;
};
export const deleteRating = async (id: number) => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-statuses/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to set wishlist:", error);
    throw error;
  }
  if (!response.ok) {
    throw new Error("Failed to set wishlist");
  }
};
