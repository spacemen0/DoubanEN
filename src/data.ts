import { faker } from "@faker-js/faker";
import { ImageProps, ListItemProps, MusicProps, ReviewProps } from "./type";

export const generateRandomData = () => ({
  src: faker.image.url({ width: 512, height: 512 }),
  alt: faker.lorem.words(),
  href: faker.internet.url(),
});

export const featuredItems: {
  image: ImageProps;
  music: MusicProps;
  review: ReviewProps;
}[] = [
  {
    image: generateRandomData(),
    music: {
      id: faker.number.int(),
      title: faker.lorem.words(),
      artist: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      username: faker.internet.userName(),
      userID: faker.number.int(),
      reviewDate: faker.date.past().toISOString().split("T")[0],
      star: 3.5,
      content: faker.lorem.paragraph(),
    },
  },
  {
    image: generateRandomData(),
    music: {
      id: faker.number.int(),
      title: faker.lorem.words(),
      artist: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      username: faker.internet.userName(),
      userID: faker.number.int(),
      reviewDate: faker.date.past().toISOString().split("T")[0],
      star: 3.5,
      content: faker.lorem.paragraphs(),
    },
  },
  {
    image: generateRandomData(),
    music: {
      id: faker.number.int(),
      title: faker.lorem.words(),
      artist: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      username: faker.internet.userName(),
      userID: faker.number.int(),
      reviewDate: faker.date.past().toISOString().split("T")[0],
      star: 3.5,
      content: faker.lorem.paragraph(),
    },
  },
  {
    image: generateRandomData(),
    music: {
      id: faker.number.int(),
      title: faker.lorem.words(),
      artist: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      username: faker.internet.userName(),
      userID: faker.number.int(),
      reviewDate: faker.date.past().toISOString().split("T")[0],
      star: 3.5,
      content: faker.lorem.paragraph(),
    },
  },
  {
    image: generateRandomData(),
    music: {
      id: faker.number.int(),
      title: faker.lorem.words(),
      artist: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
    },
    review: {
      username: faker.internet.userName(),
      userID: faker.number.int(),
      reviewDate: faker.date.past().toISOString().split("T")[0],
      star: 3.5,
      content: faker.lorem.paragraph(),
    },
  },
];

export const editorItems: ListItemProps[] = [
  {
    image: generateRandomData(),
    music: {
      id: faker.number.int(),
      title: faker.lorem.words(),
      artist: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
    },
    releaseDate: faker.date.past().toISOString().split("T")[0],
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    image: generateRandomData(),
    music: {
      id: faker.number.int(),
      title: faker.lorem.words(),
      artist: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
    },
    releaseDate: faker.date.past().toISOString().split("T")[0],
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    image: generateRandomData(),
    music: {
      id: faker.number.int(),
      title: faker.lorem.words(),
      artist: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
    },
    releaseDate: faker.date.past().toISOString().split("T")[0],
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    image: generateRandomData(),
    music: {
      id: faker.number.int(),
      title: faker.lorem.words(),
      artist: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
    },
    releaseDate: faker.date.past().toISOString().split("T")[0],
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    image: generateRandomData(),
    music: {
      id: faker.number.int(),
      title: faker.lorem.words(),
      artist: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
    },
    releaseDate: faker.date.past().toISOString().split("T")[0],
    wants: faker.number.int({ min: 100, max: 500 }),
  },
  {
    image: generateRandomData(),
    music: {
      id: faker.number.int(),
      title: faker.lorem.words(),
      artist: faker.person.fullName(),
      genre: faker.music.genre(),
      average: 3.5,
      ratings: faker.number.int({ min: 100, max: 500 }),
    },
    releaseDate: faker.date.past().toISOString().split("T")[0],
    wants: faker.number.int({ min: 100, max: 500 }),
  },
];

export const sideImages: ImageProps[] = Array.from({ length: 7 }, () =>
  generateRandomData()
);
