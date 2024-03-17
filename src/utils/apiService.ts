import {faker} from "@faker-js/faker";
import {bookItems, generateRandomData, movieItems, musicItems, myItems,} from "./data.ts";
import {AuthResponse, Media, MediaType, Review, User} from "./type.ts";

export const fetchCollectionItems = async (
    userId: number,
    type: MediaType | "All"
): Promise<Media[]> => {
    console.log(userId);
    if (type === "Music") return musicItems;
    if (type === "Movie") return movieItems;
    if (type === "Book") return bookItems;
    if (type === "All") return myItems;
    throw new Error(`Invalid type: ${type}`);
};

export const fetchCurrentOn = async (userId: number): Promise<Media[]> => {
    console.log(userId);
    console.log(myItems.slice(0, 3));
    return myItems.slice(0, 3);
};

export const fetchMyRating = async (
    userId: number,
    mediaId: number
): Promise<Review> => {
    console.log(userId, mediaId);
    return {
        userId: userId,
        username: "Spacemen0",
        mediaId: mediaId,
        reviewDate: "2024-02-13",
        star: 3.5,
        title: faker.lorem.words(),
        content: "My Review",
    };
};

export const submitRating = async (review: Review) => {
    console.log(review);
    // throw new Error("Function not implemented.");
};

export const getUser = async (id: number): Promise<User> => {
    console.log(id);
    return {
        Id: 1,
        name: faker.person.fullName(),
        profileImage: generateRandomData().src,
        role: "Standard",
        bio:
            faker.lorem.paragraphs() +
            faker.lorem.paragraphs() +
            faker.lorem.paragraphs(),
        memberSince: faker.date.past().toISOString().split("T")[0],
    };
};

export const register = async (
    username: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    console.log(username, email, password);
    return {userId: 1, token: "randomToken"};
};

export const login = async (
    username: string,
    password: string
): Promise<AuthResponse> => {
    console.log(username, password);
    return {userId: 1, token: "randomToken"};
};

export const logout = async (token: string) => {
    if (token === "randomToken") return;
    throw new Error("Error logging out");
};

export const getMedia = async (
    id: number,
    type: MediaType
): Promise<Media> => {
    console.log(id, type);
    if (type === "Music")
        return {
            id: 1,
            title: faker.lorem.words(),
            image: generateRandomData().src,
            releaseDate: faker.date.past().toISOString().split("T")[0],
            author: faker.person.fullName(),
            genre: faker.music.genre(),
            average: 3.5,
            ratings: faker.number.int({min: 100, max: 500}),
            type: "Music",
            wants: faker.number.int({min: 100, max: 500}),
            tracks: [
                faker.music.songName(),
                faker.music.songName(),
                faker.music.songName(),
                faker.music.songName(),
                faker.music.songName(),
            ],
        };
    else if (type === "Movie")
        return {
            id: 1,
            title: faker.lorem.words(),
            image: generateRandomData().src,
            releaseDate: faker.date.past().toISOString().split("T")[0],
            author: faker.person.fullName(),
            genre: faker.music.genre(),
            average: 3.5,
            ratings: faker.number.int({min: 100, max: 500}),
            type: "Movie",
            wants: faker.number.int({min: 100, max: 500}),
            casts: [
                {character: faker.person.fullName(), actor: faker.person.fullName()},
                {character: faker.person.fullName(), actor: faker.person.fullName()},
                {character: faker.person.fullName(), actor: faker.person.fullName()},
                {character: faker.person.fullName(), actor: faker.person.fullName()},
                {character: faker.person.fullName(), actor: faker.person.fullName()},
            ],
        };
    else
        return {
            id: 1,
            title: faker.lorem.words(),
            image: generateRandomData().src,
            releaseDate: faker.date.past().toISOString().split("T")[0],
            author: faker.person.fullName(),
            genre: faker.music.genre(),
            average: 3.5,
            ratings: faker.number.int({min: 100, max: 500}),
            type: "Book",
            wants: faker.number.int({min: 100, max: 500}),
            chapters: [
                faker.music.songName(),
                faker.music.songName(),
                faker.music.songName(),
                faker.music.songName(),
                faker.music.songName(),
            ],
        };
};

export const getMediaReviews = async (
    id: number,
    page: number,
): Promise<Review[]> => {
    console.log(id, page);
    const reviews: Review[] = [];
    Array.from({length: 5}, () => {
        reviews.push({
            username: faker.internet.userName(),
            userId: faker.number.int(),
            mediaId: faker.number.int(),
            reviewDate: faker.date.past().toISOString().split("T")[0],
            star: 3.5,
            title: faker.lorem.words(),
            content: faker.lorem.paragraph() + faker.lorem.paragraph(),
        });
    });
    return reviews;
};

export const getMediaReviewCount = async (
    id: number
): Promise<number> => {
    console.log(id);
    return faker.number.int({max: 100, min: 10});
};

export const postReview = async (review: Review) => {
    console.log(review);
    throw new Error("Function Not implemented yet");
};

export const getAllMedias = async (type: MediaType, page: number): Promise<Media[]> => {
    console.log(type, page);
    const media: Media[] = [];
    Array.from({length: 5}, () => {
        media.push({
            id: faker.number.int(),
            releaseDate: faker.date.past().toISOString().split("T")[0],
            type: type,
            title: faker.lorem.words(),
            genre: faker.music.genre(),
            tracks: [faker.music.songName(), faker.music.songName(), faker.music.songName(), faker.music.songName(),],
            author: faker.person.fullName(),
            average: 3.2,
            casts: [{
                character: faker.person.fullName(),
                actor: faker.person.fullName()
            }, {
                character: faker.person.fullName(),
                actor: faker.person.fullName()
            }, {
                character: faker.person.fullName(),
                actor: faker.person.fullName()
            }, {character: faker.person.fullName(), actor: faker.person.fullName()}],
            chapters: [faker.music.songName(), faker.music.songName(), faker.music.songName(), faker.music.songName(),],
            image: generateRandomData().src,
            ratings: faker.number.int({min: 100, max: 500}),
            wants: faker.number.int({min: 100, max: 500})
        });
    });
    return media
}

export const getAllMediasCount = async (
    type: MediaType
): Promise<number> => {
    console.log(type);
    return faker.number.int({max: 100, min: 10});
};

