import { Author, Media } from "../utils/type.ts";
import { apiUrl } from "../utils/config.ts";

export const getAuthor = async (id: number): Promise<Author> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/authors/${id}`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Fetch Author error");
  }
  if (response.status === 404) throw new Error("Not Exist");
  if (!response.ok) {
    throw new Error("Author");
  }
  return await response.json();
};

export const getAllMediaFromAuthor = async (
  id: number,
  page: number,
  size: number = 5,
): Promise<Media[]> => {
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/authors/${id}/media?page=${page}&size=${size}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    throw new Error("Fetch Author error");
  }
  if (response.status === 404) throw new Error("Not Exist");
  if (!response.ok) {
    throw new Error("Author");
  }
  const data = await response.json();
  return data.content;
};

export const getAllMediaCountFromAuthor = async (
  id: number,
): Promise<number> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/authors/${id}/count`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Fetch Author error");
  }
  if (response.status === 404) throw new Error("Not Exist");
  if (!response.ok) {
    throw new Error("Author");
  }
  return await response.json();
};

export const getAllAuthors = async (): Promise<Author[]> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/authors`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Fetch Author error");
  }
  if (!response.ok) {
    throw new Error("Author");
  }
  return await response.json();
};
