import { faker } from "@faker-js/faker";
import { ImageProps, Media, Review } from "./type.ts";

export const generateRandomData = () => ({
  src: faker.image.url({ width: 512, height: 512 }),
  alt: faker.lorem.words(),
  href: faker.internet.url(),
});

export const featuredItems: {
  media: Media;
  review: Review;
}[] = [
  {
    media: {
      id: 1,
      image: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
      type: "Movie",
      wants: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      username: faker.internet.userName(),
      userId: faker.number.int(),
      mediaId: faker.number.int(),
      reviewDate: faker.date.past().toISOString().split("T")[0],
      star: 2.5,
      title: "",
      content: faker.lorem.paragraph() + faker.lorem.paragraph(),
    },
  },
  {
    media: {
      id: 1,
      title: faker.lorem.words(),
      image: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      author: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 4.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
      type: "Music",
      wants: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      username: faker.internet.userName(),
      userId: faker.number.int(),
      mediaId: faker.number.int(),
      reviewDate: faker.date.past().toISOString().split("T")[0],
      star: 2.5,
      title: "",
      content: faker.lorem.paragraph() + faker.lorem.paragraph(),
    },
  },
  {
    media: {
      id: 1,
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      image: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      genre: faker.music.genre(),
      average: 1.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
      type: "Movie",
      wants: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      username: faker.internet.userName(),
      userId: faker.number.int(),
      mediaId: faker.number.int(),
      reviewDate: faker.date.past().toISOString().split("T")[0],
      star: 3.5,
      title: "",
      content: faker.lorem.paragraph() + faker.lorem.paragraph(),
    },
  },
  {
    media: {
      id: 1,
      title: faker.lorem.words(),
      image: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      author: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
      type: "Book",
      wants: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      username: faker.internet.userName(),
      userId: faker.number.int(),
      mediaId: faker.number.int(),
      reviewDate: faker.date.past().toISOString().split("T")[0],
      star: 3.5,
      title: "My Review",
      content: faker.lorem.paragraph() + faker.lorem.paragraph(),
    },
  },
  {
    media: {
      id: 1,
      title: faker.lorem.words(),
      image: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      author: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 4.0,
      ratings: faker.number.int({ min: 100, max: 500 }),
      type: "Music",
      wants: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      username: faker.internet.userName(),
      userId: faker.number.int(),
      mediaId: faker.number.int(),
      reviewDate: faker.date.past().toISOString().split("T")[0],
      star: 4.0,
      title: "",
      content: faker.lorem.paragraph() + faker.lorem.paragraph(),
    },
  },
];

export const editorItems: Media[] = [
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Book",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Movie",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Book",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Music",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Music",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Movie",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
];

export const myItems: Media[] = [
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Music",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Movie",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Music",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Book",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Movie",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Book",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
];

export const musicItems: Media[] = [
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Music",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 2,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Music",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 4,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Music",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
];

export const movieItems: Media[] = [
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Movie",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Movie",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Movie",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
];

export const bookItems: Media[] = [
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Book",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Book",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    image: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    type: "Book",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
];

export const sideImages: ImageProps[] = Array.from({ length: 7 }, () =>
  generateRandomData()
);

export const bannerText: string = `Douban EN is a website built with React, TypeScript and Tailwind CSS. 
The primary features of the site is to mark, track and organize your favorite Musics, Movies, and Books. `;

export const infoPara1: string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          doloremque est. Maxime repudiandae odit ad, ratione aliquid doloribus
          sint quas similique natus laudantium adipisci recusandae eum
          consequatur ullam unde repellat.`;

export const infoPara2: string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          doloremque est. Maxime repudiandae odit ad, ratione aliquid doloribus
          sint quas similique natus laudantium adipisci recusandae eum
          consequatur ullam unde repellat.`;

export const statusInfo: string[] = [
  "1,717,584",
  "6,017,201",
  "135,764",
  "129,452,924",
  "3,138,489",
  "734,976",
];
