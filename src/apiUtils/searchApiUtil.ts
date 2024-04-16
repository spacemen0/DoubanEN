import { Media, MediaType } from "../utils/type.ts";
import { apiUrl } from "../utils/config.ts";

export const searchMedia = async (
  type: MediaType,
  limit: number,
  text: string,
): Promise<Media[]> => {
  console.log(type);
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/medias/search?limit=${limit}&text=${text}`,
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
  return await response.json();
};
