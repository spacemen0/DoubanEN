import { apiUrl } from "../utils/config";
import { MediaStatus, MediaType } from "../utils/type";

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
    throw new Error("Error Sending Request");
  }
  if (response.status == 404) return { score: 0, status: "None" };
  if (!response.ok) {
    throw new Error("Error Fetching Media Status");
  }
  return await response.json();
};
export const setWishlist = async (
  userId: number,
  mediaId: number,
  type: MediaType,
  token: string,
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Setting Wishlist Status");
  }
};
export const cancelWishlist = async (id: number, token: string) => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-statuses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Canceling Wishlist Status");
  }
};
export const setDoing = async (
  userId: number,
  mediaId: number,
  type: MediaType,
  token: string,
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error(
      `Error Setting ${
        type === "Music" ? "Listing" : type === "Movie" ? "Watching" : "Reading"
      } Status`,
    );
  }
};
export const cancelDoing = async (id: number, token: string) => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-statuses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Canceling Media Status");
  }
};
export const submitRating = async (
  userId: number,
  score: number,
  mediaId: number,
  type: MediaType,
  token: string,
): Promise<void> => {
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  await response.json();
  if (!response.ok) {
    throw new Error("Error Submitting Rating");
  }
};
export const deleteRating = async (id: number, token: string) => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-statuses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Deleting Rating");
  }
};
