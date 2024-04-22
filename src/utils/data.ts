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
  src: `${apiUrl}/images/${imageIds[getRandomInt(0, 14)]}`,
  alt: "List Image",
});

const imageIds: number[] = [
  202, 152, 252, 302, 303, 304, 305, 306, 307, 308, 309, 602, 652, 802, 852,
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

export const homePageEditorMediaIds: number[] = [
  761, 702, 754, 805, 804, 813, 814, 758, 809,
];

export const bannerText: string = `Douban EN is a website crafted with React, TypeScript, and Tailwind CSS for the front-end, 
and Spring Boot and PostgreSQL for the back-end. 
Its core functionality revolves around marking, tracking, and organizing your beloved music, movies, and books.`;
export const bannerLinkText: string =
  "Some extra functionalities are still under development. More media data will also be added.";

export const infoPara1: string = `Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Music, Movies, and Books.
  Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Music, Movies, and Books.`;

export const infoPara2: string = `Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Music, Movies, and Books.
  Douban EN is a website built with React, TypeScript and Tailwind CSS. 
  The primary features of the site is to mark, track and organize your favorite Music, Movies, and Books.`;

//music movie book rating review list
export const statusInfo: string[] = ["46", "11", "6", "39", "6", "3"];

export const genres: { name: string; value: string }[] = [
  { name: "Ambient", value: "Ambient" },
  { name: "Blues", value: "Blues" },
  { name: "Classical Music", value: "ClassicalMusic" },
  { name: "Country", value: "Country" },
  { name: "Dance", value: "Dance" },
  { name: "Electronic", value: "Electronic" },
  { name: "Experimental", value: "Experimental" },
  { name: "Folk", value: "Folk" },
  { name: "Hip Hop", value: "HipHop" },
  { name: "Industrial & Noise", value: "IndustrialAndNoise" },
  { name: "Jazz", value: "Jazz" },
  { name: "Metal", value: "Metal" },
  {
    name: "Musical Theatre and Entertainment",
    value: "MusicalTheatreAndEntertainment",
  },
  { name: "New Age", value: "NewAge" },
  { name: "Pop", value: "Pop" },
  { name: "Psychedelia", value: "Psychedelia" },
  { name: "Punk", value: "Punk" },
  { name: "R&B", value: "RnB" },
  { name: "Regional Music", value: "RegionalMusic" },
  { name: "Rock", value: "Rock" },
  { name: "Singer-Songwriter", value: "SingerSongwriter" },
  { name: "Spoken Word", value: "SpokenWord" },
  // Add other music genres as needed
  { name: "Action", value: "Action" },
  { name: "Adventure", value: "Adventure" },
  { name: "Animation", value: "Animation" },
  { name: "Biography", value: "Biography" },
  { name: "Comedy", value: "Comedy" },
  { name: "Crime", value: "Crime" },
  { name: "Documentary", value: "Documentary" },
  { name: "Drama", value: "Drama" },
  { name: "Fantasy", value: "Fantasy" },
  { name: "History", value: "History" },
  { name: "Horror", value: "Horror" },
  { name: "Mystery", value: "Mystery" },
  { name: "Musical", value: "Musical" },
  { name: "Romance", value: "Romance" },
  { name: "Sci-Fi", value: "SciFi" },
  { name: "War", value: "War" },
  { name: "Historical Fiction", value: "HistoricalFiction" },
  { name: "Contemporary Fiction", value: "ContemporaryFiction" },
  { name: "Literary Fiction", value: "LiteraryFiction" },
  { name: "Poetry", value: "Poetry" },
  { name: "Plays", value: "Plays" },
  { name: "Philosophy", value: "Philosophy" },
  { name: "Politics", value: "Politics" },
  { name: "Essays", value: "Essays" },
  { name: "Non-Fiction", value: "NonFiction" },
];
