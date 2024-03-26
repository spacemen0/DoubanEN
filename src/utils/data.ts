import { ImageProps } from "./type";

function getRandomInt(min: number, max: number): number {
  // Ensure that min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);

  // Generate a random number within the range [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomData = () => ({
  src: images[getRandomInt(0, 10)],
  alt: "List Image",
});

const images: string[] = [
  "https://doubanenserver.azurewebsites.net/loveless.jpg",
  "https://doubanenserver.azurewebsites.net/sonic-nurse.jpg",
  "https://doubanenserver.azurewebsites.net/murry-street.jpg",
  "https://doubanenserver.azurewebsites.net/dirty.jpg",
  "https://doubanenserver.azurewebsites.net/evol.jpg",
  "https://doubanenserver.azurewebsites.net/uchu-nippon-setagaya.jpg",
  "https://doubanenserver.azurewebsites.net/goo.jpg",
  "https://doubanenserver.azurewebsites.net/washing-machine.jpg",
  "https://doubanenserver.azurewebsites.net/daydream-nation.jpg",
  "https://doubanenserver.azurewebsites.net/Something-in-the-Air.jpg",
  "https://doubanenserver.azurewebsites.net/long-season.jpg",
];
export const bannerImage: { listId: number; imageProps: ImageProps } = {
  listId: 0,
  imageProps: generateRandomData(),
};

export const sideImages: { listId: number; ImageProps: ImageProps }[] =
  Array.from({ length: 7 }, () => {
    return {
      listId: getRandomInt(0, 18),
      ImageProps: generateRandomData(),
    };
  });

export const homePageReviewIds: number[] = [1, 2, 3, 4];

export const homePageEditorMediaIds: number[] = [758, 757, 761, 702, 754];

export const bannerText: string = `Douban EN is a website built with React, TypeScript and Tailwind CSS. 
The primary features of the site is to mark, track and organize your favorite Musics, Movies, and Books. `;

export const infoPara1: string = `Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Musics, Movies, and Books.
  Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Musics, Movies, and Books.`;

export const infoPara2: string = `Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Musics, Movies, and Books.
  Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Musics, Movies, and Books.`;

export const statusInfo: string[] = ["11", "11", "6", "9", "4", "0"];
