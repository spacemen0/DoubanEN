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
  src: `${apiUrl}/images/${imageIds[getRandomInt(0, imageIds.length - 1)]}`,
  alt: "List Image",
});

const imageIds: number[] = [
  202, 152, 252, 302, 303, 304, 305, 306, 307, 308, 309, 602, 652, 802, 852,
  1123, 1124, 1125, 1152, 1104, 1153, 1154, 1108, 1155, 1156, 1117, 1114, 1115,
  1118,
];
export const bannerImage: { listId: number; imageProps: ImageProps } = {
  listId: 153,
  imageProps: generateRandomImage(),
};
const sideListIds: number[] = [154, 152, 153, 3, 52, 2, 153];

const sideListImages: ImageProps[] = [];

while (sideListImages.length < 7) {
  const randomImage = generateRandomImage();
  if (!sideListImages.some((image) => image.src === randomImage.src)) {
    sideListImages.push(randomImage);
  }
}

export const sideLists: { listId: number; ImageProps: ImageProps }[] =
  Array.from({ length: 7 }, (_, index) => {
    return {
      listId: sideListIds[index],
      ImageProps: sideListImages[index],
    };
  });

export const homePageReviewIds: number[] = [4, 3, 252, 2, 402];

export const activeUserIds: number[] = [102, 152, 303, 352, 452];

export const homePageEditorMediaIds: number[] = [
  761, 702, 754, 805, 804, 813, 814, 758, 809,
];

export const bannerText: string = `Douban EN is a website crafted with React, TypeScript, and Tailwind CSS for the front-end, 
and Spring Boot and PostgreSQL for the back-end. 
Its core functionality revolves around marking, tracking, and organizing your beloved music, movies, and books.`;
export const bannerLinkText: string =
  "Contribution is very welcome. Help us improve and grow together.";

export const infoPara1: string = `Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Music, Movies, and Books.
  Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Music, Movies, and Books.`;

export const infoPara2: string = `Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Music, Movies, and Books.
  Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Music, Movies, and Books.`;

//music movie book rating review list
export const statusInfo: string[] = ["46", "11", "6", "93", "7", "11"];

export const musicGenres: string[] = [
  "Ambient",
  "Blues",
  "Classical Music",
  "Country",
  "Dance",
  "Electronic",
  "Experimental",
  "Folk",
  "Hip Hop",
  "Industrial & Noise",
  "Jazz",
  "Metal",
  "Musical Theatre and Entertainment",
  "New Age",
  "Pop",
  "Psychedelia",
  "Punk",
  "R&B",
  "Regional Music",
  "Rock",
  "Singer-Songwriter",
  "Spoken Word",
];

export const movieGenres: string[] = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Musical",
  "Romance",
  "Sci-Fi",
  "War",
];

export const bookGenres: string[] = [
  "Biography",
  "History",
  "Mystery",
  "Horror",
  "Romance",
  "Sci-Fi",
  "War",
  "Historical Fiction",
  "Contemporary Fiction",
  "Literary Fiction",
  "Poetry",
  "Plays",
  "Philosophy",
  "Politics",
  "Essays",
  "Non-Fiction",
];
