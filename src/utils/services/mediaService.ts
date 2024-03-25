import { Media, MediaType } from "../type";
import { apiUrl } from "../config";

export const getMedia = async (id: number): Promise<Media> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/medias/${id}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Media:", error);
    throw new Error("Failed to fetch Media. Please try again later.");
  }
  if (response.status === 404) throw new Error("Not Exist");
  if (!response.ok) {
    throw new Error("Failed to fetch Media");
  }
  const data = await response.json();
  if (data.type === "Music") data.tracks = data.additional.split("\n");
  if (data.type === "Book") data.chapters = data.additional.split("\n");
  if (data.type === "Movie") {
    const lines = data.additional.split("\n");
    const result: { character: string; actor: string }[] = [];

    for (let i = 0; i < lines.length; i += 2) {
      const obj: { character: string; actor: string } = {
        character: lines[i],
        actor: lines[i + 1] || "", // Handle case when there are an odd number of lines
      };
      result.push(obj);
    }
    data.casts = result;
  }
  return data;
};
export const getAllMediasByType = async (
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
    console.error("Error fetching Medias:", error);
    throw new Error("Failed to fetch Medias. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch Medias");
  }
  const res = await response.json();
  return res["content"];
};
export const getAllMediasCountByType = async (
  type: MediaType,
): Promise<number> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/medias/count/${type}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Medias Count:", error);
    throw new Error("Failed to fetch Medias Count. Please try again later.");
  }

  return await response.json();
};
