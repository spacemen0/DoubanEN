import { Media, MediaRequest } from "./type.ts";
import { getAuthor } from "../apiUtils/authorApiUtil.ts";

export const processMediaJson = (data: Media): Media => {
  let processedData: Media = { ...data };

  if (data.type === "Music") {
    if (data.additional) {
      processedData = { ...processedData, tracks: data.additional.split("\n") };
    }
  } else if (data.type === "Book") {
    if (data.additional) {
      processedData = {
        ...processedData,
        chapters: data.additional.split("\n"),
      };
    }
  } else if (data.type === "Movie") {
    if (data.additional) {
      const lines = data.additional.split("\n");
      const result: { character: string; actor: string }[] = [];

      for (let i = 0; i < lines.length; i += 2) {
        const obj: { character: string; actor: string } = {
          character: lines[i],
          actor: lines[i + 1] || "",
        };
        result.push(obj);
      }

      processedData = { ...processedData, casts: result };
    }
  }

  return processedData;
};

export function getCurrentLocalDate(): string {
  const date = new Date(Date.now());
  return date.toISOString().split("T")[0];
}

export async function mediaRequestToMedia(
  request: MediaRequest,
): Promise<Media> {
  const author = await getAuthor(request.author);
  return {
    id: -1,
    description: request.description,
    type: request.type,
    imageUrl: request.imageUrl,
    title: request.title,
    author: request.author,
    author_name: author.name,
    additional: request.additional,
    genre: request.genre,
    releaseDate: request.releaseDate,
    average: 0,
    wants: 0,
    ratings: 0,
    doings: 0,
  };
}

export function formatLocalDateTime(dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return `${formattedDate} ${formattedTime}`;
}
