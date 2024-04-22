import { Media } from "./type.ts";

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
