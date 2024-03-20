import {faker} from "@faker-js/faker";
import {bookItems, generateRandomData, movieItems, musicItems, myItems,} from "./data.ts";
import {AuthResponse, ListInfo, Media, MediaStatus, MediaType, Review, User} from "./type.ts";
import {apiUrl} from "./config.ts";

export const fetchCollectionItems = async (
    userId: number,
    type: MediaType | "All"
): Promise<Media[]> => {
    console.log("Fetching Collection Items: ", userId);
    if (type === "Music") return musicItems;
    if (type === "Movie") return movieItems;
    if (type === "Book") return bookItems;
    if (type === "All") return myItems;
    return []
};

export const fetchCurrentOn = async (userId: number): Promise<Media[]> => {
    console.log(userId);
    console.log(myItems.slice(0, 3));
    return myItems.slice(0, 3);
};

export const fetchMediaStatus = async (
    userId: number,
    mediaId: number
): Promise<MediaStatus> => {
    console.log(userId, mediaId);
    return {
        status: "None",
        score: 0,
        date: faker.date.past().toISOString().split("T")[0],
    };
};


export const getUser = async (id: number): Promise<User> => {
    try {
        const response = await fetch(`${apiUrl}/users/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const data = await response.json() as User
        if (!data.profileImage) data.profileImage = generateRandomData().src
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data. Please try again later.');
    }
};


export const register = async (
    username: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    const requestBody = {
        username: username,
        email: email,
        password: password
    };
    try {
        const response = await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            throw new Error('Failed to log in');
        }
        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// login function sends a POST request to the backend server with user credentials
export const login = async (
    username: string,
    password: string
): Promise<AuthResponse> => {
    const requestBody = {
        username: username,
        password: password
    };
    try {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            throw new Error('Failed to log in');
        }
        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Failed to log in. Please try again later.');
    }
};

export const logout = async (token: string): Promise<void> => {
    try {
        const response = await fetch(`${apiUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to log out');
        }
    } catch (error) {
        console.error('Logout error:', error);
        throw new Error('Failed to log out. Please try again later.'); // Throw a different error message or handle it accordingly
    }
};


export const getMedia = async (
    id: number,
): Promise<Media> => {
    try {
        const response = await fetch(`${apiUrl}/users/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Media');
        }
        const data = await response.json()
        if (data.type === "Music") data.tracks = data.additional.split('\n');
        if (data.type === "Book") data.chapters = data.additional.split('\n');
        if (data.type === "Movie") {
            const lines = data.additional.split('\n');
            const result: { character: string; actor: string }[] = [];

            for (let i = 0; i < lines.length; i += 2) {
                const obj: { character: string; actor: string } = {
                    character: lines[i],
                    actor: lines[i + 1] || '' // Handle case when there are an odd number of lines
                };
                result.push(obj);
            }
            data.casts = result
        }
        return data;
    } catch (error) {
        console.error('Error fetching Media:', error);
        throw new Error('Failed to fetch Media. Please try again later.');
    }
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
            score: 3.5,
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
    //throw new Error("Function Not implemented yet");
};

export const deleteReview = async (userId: number, mediaId: number) => {
    console.log(userId, mediaId)
    //throw new Error("Function Not implemented yet")
}
export const setWishlist = async (userId: number, mediaId: number) => {
    console.log(userId, mediaId)
    //throw new Error("Function Not implemented yet")
}

export const cancelWishlist = async (userId: number, mediaId: number) => {
    console.log(userId, mediaId)
    //throw new Error("Function Not implemented yet")
}

export const setDoing = async (userId: number, mediaId: number) => {
    console.log(userId, mediaId)
    //throw new Error("Function Not implemented yet")
}

export const cancelDoing = async (userId: number, mediaId: number) => {
    console.log(userId, mediaId)
    //throw new Error("Function Not implemented yet")
}

export const submitRating = async (review: Review) => {
    console.log(review);
    //throw new Error("Function Not implemented yet");
};

export const deleteRating = async (userId: number, mediaId: number) => {
    console.log(userId, mediaId)
    //throw new Error("Function Not implemented yet")
}


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
            additional: faker.lorem.words(),
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

export const getListItemsCount = async (id: number): Promise<number> => {
    console.log(id)
    return faker.number.int({max: 100, min: 10});
}

export const getAllListItems = async (id: number, page: number): Promise<Media[]> => {
    console.log(id, page);
    const medias: Media[] = [];
    Array.from({length: 5}, () => {
        medias.push({
            id: faker.number.int(),
            releaseDate: faker.date.past().toISOString().split("T")[0],
            type: "Music",
            title: faker.lorem.words(),
            genre: faker.music.genre(),
            additional: faker.lorem.words(),
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
    return medias
}

export const getListInfo = async (id: number): Promise<ListInfo> => {
    console.log(id)
    return {
        username: "spacemen0",
        userId: faker.number.int({max: 100, min: 10}),
        description: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
        updatedAt: faker.date.past().toISOString().split("T")[0],
        title: faker.lorem.words()

    }
}

