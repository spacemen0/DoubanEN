import { faker } from "@faker-js/faker";
import { ImageProps, Media, Review } from "./type";

export const generateRandomData = () => ({
  src: faker.image.url({ width: 512, height: 512 }),
  alt: faker.lorem.words(),
  href: faker.internet.url(),
});

export const bannerImage: { listId: number; imageProps: ImageProps } = {
  listId: faker.number.int({ min: 100, max: 500 }),
  imageProps: generateRandomData(),
};

export const featuredItems: {
  media: Media;
  review: Review;
}[] = [
  {
    media: {
      id: 1,
      imageUrl: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      genre: faker.music.genre(),
      doings: 0,
      description: "Description",
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
      additional: faker.lorem.words(),
      type: "Movie",
      wants: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      id: faker.number.int(),
      username: faker.internet.userName(),
      userId: faker.number.int(),
      mediaId: faker.number.int(),
      date: faker.date.past().toISOString().split("T")[0],
      score: 2.5,
      title: "",
      content: faker.lorem.paragraph() + faker.lorem.paragraph(),
    },
  },
  {
    media: {
      id: 1,
      title: faker.lorem.words(),
      imageUrl: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      author: faker.person.fullName(),
      genre: faker.music.genre(),
      doings: 0,
      description: "Description",
      average: 4.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
      additional: faker.lorem.words(),
      type: "Music",
      wants: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      id: faker.number.int(),
      username: faker.internet.userName(),
      userId: faker.number.int(),
      mediaId: faker.number.int(),
      date: faker.date.past().toISOString().split("T")[0],
      score: 2.5,
      title: "",
      content: faker.lorem.paragraph() + faker.lorem.paragraph(),
    },
  },
  {
    media: {
      id: 1,
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      imageUrl: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      genre: faker.music.genre(),
      doings: 0,
      description: "Description",
      average: 1.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
      additional: faker.lorem.words(),
      type: "Movie",
      wants: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      id: faker.number.int(),
      username: faker.internet.userName(),
      userId: faker.number.int(),
      mediaId: faker.number.int(),
      date: faker.date.past().toISOString().split("T")[0],
      score: 3.5,
      title: "",
      content: faker.lorem.paragraph() + faker.lorem.paragraph(),
    },
  },
  {
    media: {
      id: 1,
      title: faker.lorem.words(),
      imageUrl: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      author: faker.person.fullName(),
      genre: faker.music.genre(),
      doings: 0,
      description: "Description",
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
      additional: faker.lorem.words(),
      type: "Book",
      wants: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      id: faker.number.int(),
      username: faker.internet.userName(),
      userId: faker.number.int(),
      mediaId: faker.number.int(),
      date: faker.date.past().toISOString().split("T")[0],
      score: 3.5,
      title: "My Review",
      content: faker.lorem.paragraph() + faker.lorem.paragraph(),
    },
  },
  {
    media: {
      id: 1,
      title: faker.lorem.words(),
      imageUrl: generateRandomData().src,
      releaseDate: faker.date.past().toISOString().split("T")[0],
      author: faker.person.fullName(),
      genre: faker.music.genre(),
      doings: 0,
      description: "Description",
      average: 4.0,
      ratings: faker.number.int({ min: 100, max: 500 }),
      additional: faker.lorem.words(),
      type: "Music",
      wants: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      id: faker.number.int(),
      username: faker.internet.userName(),
      userId: faker.number.int(),
      mediaId: faker.number.int(),
      date: faker.date.past().toISOString().split("T")[0],
      score: 4.0,
      title: "",
      content: faker.lorem.paragraph() + faker.lorem.paragraph(),
    },
  },
];

export const editorItems: Media[] = [
  {
    id: 1,
    imageUrl: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    doings: 0,
    description: "Description",
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    additional: faker.lorem.words(),
    type: "Book",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    imageUrl: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    doings: 0,
    description: "Description",
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    additional: faker.lorem.words(),
    type: "Movie",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    imageUrl: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    doings: 0,
    description: "Description",
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    additional: faker.lorem.words(),
    type: "Book",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    imageUrl: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    doings: 0,
    description: "Description",
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    additional: faker.lorem.words(),
    type: "Music",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    imageUrl: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    doings: 0,
    description: "Description",
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    additional: faker.lorem.words(),
    type: "Music",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    id: 1,
    imageUrl: generateRandomData().src,
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    doings: 0,
    description: "Description",
    average: 3.5,
    ratings: faker.number.int({ min: 100, max: 500 }),
    additional: faker.lorem.words(),
    type: "Movie",
    wants: faker.number.int({ min: 100, max: 500 }),
  },
];
export const sideImages: { listId: number; ImageProps: ImageProps }[] =
  Array.from({ length: 7 }, () => {
    return {
      listId: faker.number.int({ min: 100, max: 500 }),
      ImageProps: generateRandomData(),
    };
  });

export const bannerText: string = `Douban EN is a website built with React, TypeScript and Tailwind CSS. 
The primary features of the site is to mark, track and organize your favorite Musics, Movies, and Books. `;

export const infoPara1: string =
  faker.lorem.paragraphs() + faker.lorem.paragraphs();

export const infoPara2: string =
  faker.lorem.paragraphs() + faker.lorem.paragraphs();

export const statusInfo: string[] = [
  "1,717,584",
  "6,017,201",
  "135,764",
  "129,452,924",
  "3,138,489",
  "734,976",
];
