import { Media, MediaType } from "../utils/type.ts";
import { apiUrl } from "../utils/config.ts";

export const searchMedia = async (
  type: MediaType,
  page: number,
  limit: number,
  text: string,
): Promise<Media[]> => {
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/medias/search?limit=${limit}&page=${page}&text=${text}&type=${type}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Getting Searching Result");
  }
  return await response.json();
};
