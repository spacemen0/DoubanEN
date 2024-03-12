export type SearchOption = "Music" | "Movie" | "Book";

export type DropDownSearchOptionProps = {
  selectedOption: SearchOption;
  onOptionClick: (option: SearchOption) => void;
};

export type ImageProps = {
  src: string;
  alt: string;
  href: string;
};

export type MusicProps = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  average: number;
  ratings: number;
};

export type ReviewProps = {
  username: string;
  userID: number;
  reviewDate: string;
  star: 0.5 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0 | 3.5 | 4.0 | 4.5 | 5.0;
  content: string;
};

export type ListItemProps = {
  image: ImageProps;
  music: MusicProps;
  releaseDate: string;
  wants: number;
};

export type User = {
  name: string;
  role: "Admin" | "Contributor" | "Standard";
  memberSince: string;
  imageUrl: string;
  ID: number;
};

export type UserState = {
  user: User | null;
  isLoggedIn: boolean;
};
