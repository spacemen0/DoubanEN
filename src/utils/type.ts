export type AuthResponse = {
  userId: number | null;
  token: string | null;
};

export type MediaType = "Music" | "Movie" | "Book" | "All";

export type AuthorType = "Artist" | "Director" | "Author" | "All";

export type StatusType = "Rated" | "Wishlist" | "Doing" | "Reviewed";

export type UserRole = "Admin" | "Contributor" | "Standard";

export type RequestStatus = "Pending" | "Approved" | "Reject";

export type CommentArea = "Media" | "User" | "MediaList" | "Review";

export type RatingScore =
  | 0.5
  | 1.0
  | 1.5
  | 2.0
  | 2.5
  | 3.0
  | 3.5
  | 4.0
  | 4.5
  | 5.0;

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
  score: RatingScore;
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

export type User = {
  username: string;
  role: UserRole;
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

export type Comment = {
  id: number;
  commentArea: CommentArea;
  areaId: number;
  content: string;
  userId: number;
  date: string;
};

export type MediaRequest = {
  id: number;
  userId: number;
  actionTime: string;
  status: RequestStatus;
  message: string;
  imageUrl: string;
  type: "Music" | "Movie" | "Book";
  description: string;
  title: string;
  author: number;
  author_name: string;
  resourceId: number;
  releaseDate: string;
  genre: string;
  additional: string;
};

export type AuthorRequest = {
  id: number;
  userId: number;
  actionTime: string;
  status: RequestStatus;
  message: string;
  name: string;
  resourceId: number;
  type: AuthorType;
  genres: string[];
};
