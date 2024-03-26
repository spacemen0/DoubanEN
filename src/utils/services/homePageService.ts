import { Media, Review } from "../type.ts";
import { apiUrl } from "../config.ts";
import { getMedia } from "./mediaService.ts";

export const fetchFeaturedItems = async (
  reviewIds: number[],
): Promise<{ medias: Media[]; reviews: Review[] }> => {
  const reviewPromises: Promise<Review>[] = reviewIds.map(async (id) => {
    return fetchSingleReview(id);
  });
  const reviews: Review[] = await Promise.all(reviewPromises);

  const mediaIds: number[] = reviews.map((review) => {
    return review.mediaId;
  });

  const mediaPromises: Promise<Media>[] = mediaIds.map(async (id) => {
    return getMedia(id);
  });
  const medias: Media[] = await Promise.all(mediaPromises);

  return { medias: medias, reviews: reviews };
};

const fetchSingleReview = async (id: number): Promise<Review> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/reviews/${id}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Review:", error);
    throw new Error("Failed to fetch Review. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch Media Reviews");
  }
  const data = await response.json();
  const review = data as Review & {
    user: {
      username: string;
      id: number;
    };
  };
  review.username = review.user.username;
  review.userId = review.user.id;
  return review;
};

export const fetchEditorMedias = async (
  mediaIds: number[],
): Promise<Media[]> => {
  const mediaPromises = mediaIds.map(async (id) => {
    return getMedia(id);
  });
  return await Promise.all(mediaPromises);
};
