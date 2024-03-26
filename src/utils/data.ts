import { faker } from "@faker-js/faker";
import { ImageProps } from "./type";

export const generateRandomData = () => ({
  src: faker.image.url({ width: 512, height: 512 }),
  alt: faker.lorem.words(),
  href: faker.internet.url(),
});

export const bannerImage: { listId: number; imageProps: ImageProps } = {
  listId: faker.number.int({ min: 100, max: 500 }),
  imageProps: generateRandomData(),
};

export const sideImages: { listId: number; ImageProps: ImageProps }[] =
  Array.from({ length: 7 }, () => {
    return {
      listId: faker.number.int({ min: 100, max: 500 }),
      ImageProps: generateRandomData(),
    };
  });

export const homePageReviewIds: number[] = [1, 2, 3, 4];

export const homePageEditorMediaIds: number[] = [758, 757, 761, 702, 754];

export const bannerText: string = `Douban EN is a website built with React, TypeScript and Tailwind CSS. 
The primary features of the site is to mark, track and organize your favorite Musics, Movies, and Books. `;

export const infoPara1: string = faker.lorem.paragraphs();

export const infoPara2: string = faker.lorem.paragraphs();

export const statusInfo: string[] = [
  "1,717,584",
  "6,017,201",
  "135,764",
  "129,452,924",
  "3,138,489",
  "734,976",
];
