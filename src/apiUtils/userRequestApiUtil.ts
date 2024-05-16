import { AuthorRequest, MediaRequest, RequestStatus } from "../utils/type.ts";
import { apiUrl } from "../utils/config.ts";

export const getAllMediaRequestsByUserId = async (
  userId: number,
  token: string,
): Promise<MediaRequest[]> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-requests?userId=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching User Media Requests");
  }
  return await response.json();
};

export const getAllAuthorRequestsByUserId = async (
  userId: number,
  token: string,
): Promise<AuthorRequest[]> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/author-requests?userId=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching User Author Requests");
  }
  return await response.json();
};

export const getAllMediaRequestsByStatus = async (
  status: RequestStatus,
  token: string,
): Promise<MediaRequest[]> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-requests?status=${status}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching Media Requests");
  }
  return await response.json();
};

export const getAllAuthorRequestsByStatus = async (
  status: RequestStatus,
  token: string,
): Promise<AuthorRequest[]> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/author-requests?status=${status}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching Author Requests");
  }
  return await response.json();
};

export const processMediaRequest = async (
  id: number,
  approve: boolean,
  message: string,
  token: string,
): Promise<void> => {
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/media-requests/${id}?approve=${approve}&message=${message}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Processing Media Request");
  }
  return;
};

export const processAuthorRequest = async (
  id: number,
  approve: boolean,
  message: string,
  token: string,
): Promise<void> => {
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/author-requests/${id}?approve=${approve}&message=${message}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Processing Author Request");
  }
  return;
};
