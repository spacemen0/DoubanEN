export type SearchOption = "Music" | "Movie" | "Book";

export type DropDownSearchOptionProps = {
  selectedOption: SearchOption;
  onOptionClick: (option: SearchOption) => void;
};

export type AuthResponse = {
  userId: number | null;
  token: string | null;
};

export type MediaType = "Music" | "Movie" | "Book";

export type Score = 0.5 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0 | 3.5 | 4.0 | 4.5 | 5.0;

export type ImageProps = {
  src: string;
  alt: string;
  href: string;
};

export type Media = {
  id: number;
  imageUrl: string;
  type: "Music" | "Movie" | "Book";
  description: string;
  title: string;
  author: string;
  releaseDate: string;
  genre: string;
  average: number;
  ratings: number;
  wants: number;
  additional: string;
  tracks?: string[];
  chapters?: string[];
  casts?: { character: string; actor: string }[];
};

export type Review = {
  id?: number;
  username: string;
  userId: number;
  mediaId: number;
  date: string;
  score: Score;
  title: string;
  content: string;
};

export type MediaStatus = {
  id?: number;
  score: number;
  status: StatusType | "None";
  date?: string;
  mediaId?: number;
};

export type StatusType = "Rated" | "Wishlist" | "Doing" | "Reviewed";

export type User = {
  username: string;
  role: "Admin" | "Contributor" | "Standard";
  date: string;
  profileImage: string;
  bio: string;
  id: number;
};

export type ListInfo = {
  id: number;
  username: string;
  userId: number;
  description: string;
  updatedAt: string;
  title: string;
};
