export type SearchOption = "Music" | "Movie" | "Book";

export type DropDownSearchOptionProps = {
    selectedOption: SearchOption;
    onOptionClick: (option: SearchOption) => void;
};

export type AuthResponse = {
    userId: number | null;
    token: string | null;
};

export type ImageProps = {
    src: string;
    alt: string;
    href: string;
};

export type Media = {
    id: number;
    image: string;
    type: "Music" | "Movie" | "Book";
    title: string;
    author: string;
    releaseDate: string;
    genre: string;
    average: number;
    ratings: number;
    wants: number;
    tracks?: string[];
    chapters?: string[];
    casts?: { character: string; actor: string }[];
};

export type Review = {
    username: string;
    userId: number;
    mediaId: number;
    reviewDate: string;
    star: 0.5 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0 | 3.5 | 4.0 | 4.5 | 5.0;
    title: string;
    content: string;
};

export type User = {
    name: string;
    role: "Admin" | "Contributor" | "Standard";
    memberSince: string;
    profileImage: string;
    bio: string;
    Id: number;
};

