import { ImageProps } from "./type";
import { apiUrl } from "./config.ts";

function getRandomInt(min: number, max: number): number {
  // Ensure that min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);

  // Generate a random number within the range [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomImage = () => ({
  src: `${apiUrl}/images/${imageIds[getRandomInt(0, 10)]}`,
  alt: "List Image",
});

const imageIds: number[] = [
  202, 152, 252, 302, 303, 304, 305, 306, 307, 308, 309,
];
export const bannerImage: { listId: number; imageProps: ImageProps } = {
  listId: 0,
  imageProps: generateRandomImage(),
};
const sideListIds: number[] = [154, 152, 153, 3, 52, 2, 153];
const sideListImages: ImageProps[] = Array.from({ length: 7 }, () => {
  return generateRandomImage();
});

export const sideLists: { listId: number; ImageProps: ImageProps }[] =
  Array.from({ length: 7 }, (_, index) => {
    return {
      listId: sideListIds[index],
      ImageProps: sideListImages[index],
    };
  });

export const homePageReviewIds: number[] = [2, 4, 3, 252, 402];

export const homePageEditorMediaIds: number[] = [
  758, 809, 761, 702, 754, 805, 804, 813, 814,
];

export const bannerText: string = `Douban EN is a website crafted with React, TypeScript, and Tailwind CSS for the front-end, 
and Spring Boot and PostgreSQL for the back-end. 
Its core functionality revolves around marking, tracking, and organizing your beloved music, movies, and books.`;
export const bannerLinkText: string =
  "Some extra functionalities are still under development. More media data will also be added.";

export const infoPara1: string = `Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Musics, Movies, and Books.
  Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Musics, Movies, and Books.`;

export const infoPara2: string = `Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Musics, Movies, and Books.
  Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Musics, Movies, and Books.`;

//music movie book rating review list
export const statusInfo: string[] = ["11", "11", "6", "39", "6", "3"];
