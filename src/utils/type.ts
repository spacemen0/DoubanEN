export type AuthResponse = {
  userId: number | null;
  token: string | null;
};

export type MediaType = "Music" | "Movie" | "Book" | "All";

export type AuthorType = "Artist" | "Director" | "Author" | "All";

export type Score = 0.5 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0 | 3.5 | 4.0 | 4.5 | 5.0;

export type ImageProps = {
  src: string;
  alt: string;
};

export type Media = {
  id: number;
  imageUrl: string;
  type: "Music" | "Movie" | "Book";
  description: string;
  title: string;
  author_name: string;
  author: number;
  releaseDate: string;
  genre: string;
  average: number;
  ratings: number;
  wants: number;
  doings: number;
  additional: string;
  tracks?: string[];
  chapters?: string[];
  casts?: { character: string; actor: string }[];
};

export type Author = {
  id: number;
  name: string;
  type: AuthorType;
  genres: string[];
};

export type Review = {
  id: number;
  username: string;
  userId: number;
  mediaId: number;
  mediaType: MediaType;
  date: string;
  score: Score;
  title: string;
  content: string;
  likes: number;
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
  profileImageUrl: string;
  bio: string;
  id: number;
  email?: string;
};

export type ListInfo = {
  id: number;
  username: string;
  userId: number;
  description: string;
  updatedAt: string;
  title: string;
  imageUrl: string;
};

export type ProfileFormData = {
  bio: string | null;
  email: string | null;
  password: string | null;
  oldPassword: string | null;
  image: File | null;
};
