import { MediaType, Review } from "../utils/type.ts";
import { apiUrl } from "../utils/config.ts";

export const getMediaReviewCount = async (id: number): Promise<number> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/reviews/count?mediaId=${id}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Reviews Count:", error);
    throw new Error("Failed to fetch Reviews Count. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch Reviews Count");
  }
  return await response.json();
};
export const getMediaReviews = async (
  id: number,
  page: number,
): Promise<Review[]> => {
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/reviews?mediaId=${id}&page=${page}&size=5`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    console.error("Error fetching Media Reviews:", error);
    throw new Error("Failed to fetch Media Reviews. Please try again later.");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch Media Reviews");
  }
  const data = await response.json();
  const reviewsFromServer = data["content"] as (Review & {
    user: {
      username: string;
      id: number;
    };
  })[];
  return reviewsFromServer.map((review) => {
    review.username = review.user.username;
    review.userId = review.user.id;
    return review;
  });
};
export const postReview = async (
  review: Review,
  type: MediaType,
  token: string,
) => {
  let response = new Response();
  const ReviewRequestBody = {
    ...review,
    user: {
      id: review.userId,
    },
  };
  const { id, ...requestBodyWithoutId } = ReviewRequestBody;
  console.log(id);
  try {
    response = await fetch(`${apiUrl}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBodyWithoutId),
    });
  } catch (error) {
    console.error("Error posting Review:", error);
    throw new Error("Failed to post Review. Please try again later.");
  }

  if (!response.ok) {
    throw new Error("Failed to post Review");
  }
  const statusRequestBody = {
    userId: review.userId,
    mediaId: review.mediaId,
    type: type,
    status: "Reviewed",
    score: review.score,
  };
  try {
    response = await fetch(`${apiUrl}/media-statuses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(statusRequestBody),
    });
  } catch (error) {
    console.error("Failed to update media status:", error);
    throw error;
  }
  if (!response.ok) {
    throw new Error("Failed to update media status");
  }
};
export const deleteReview = async (
  userId: number,
  mediaId: number,
  statusId: number,
  token: string,
) => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/media-statuses/${statusId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to cancel reviewed status:", error);
    throw error;
  }
  if (!response.ok) {
    throw new Error("Failed to cancel reviewed status");
  }
  try {
    response = await fetch(
      `${apiUrl}/reviews?userId=${userId}&mediaId=${mediaId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.error("Failed to delete reviewed status", error);
    throw error;
  }
  if (!response.ok) {
    throw new Error("Failed to delete reviewed status");
  }
};
export const fetchSingleReview = async (id: number): Promise<Review> => {
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

export const getUserReviewsCountByMediaType = async (
  userId: number,
  type: MediaType,
): Promise<number> => {
  let response = new Response();
  const url = `${apiUrl}/reviews/count?type=${type}&userId=${userId}`;
  try {
    response = await fetch(url, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Review count:", error);
    throw new Error("Failed to fetch Media count. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch Media count");
  }
  return await response.json();
};

export const getReviewsByTypeAndUserIdWithPagination = async (
  userId: number,
  type: MediaType,
  page: number,
  size: number = 5,
): Promise<Review[]> => {
  let response = new Response();
  const url = `${apiUrl}/reviews?type=${type}&userId=${userId}&page=${page}&size=${size}`;
  try {
    response = await fetch(url, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching Reviews", error);
    throw new Error("Failed to fetch Reviews. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch Media count");
  }
  const data = await response.json();
  const reviewsFromServer = data["content"] as (Review & {
    user: {
      username: string;
      id: number;
    };
  })[];
  return reviewsFromServer.map((review) => {
    review.username = review.user.username;
    review.userId = review.user.id;
    return review;
  });
};

export const likeReview = async (
  reviewId: number,
  userId: number,
  token: string,
): Promise<void> => {
  let response = new Response();
  const url = `${apiUrl}/reviews/${reviewId}/like?userId=${userId}`;
  try {
    response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error liking Review", error);
    throw new Error("Failed to like Review. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  return;
};

export const unlikeReview = async (
  reviewId: number,
  userId: number,
  token: string,
): Promise<void> => {
  let response = new Response();
  const url = `${apiUrl}/reviews/${reviewId}/unlike?userId=${userId}`;
  try {
    response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error liking Review", error);
    throw new Error("Failed to like Review. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  return;
};

export const isReviewLiked = async (
  reviewId: number,
  userId: number,
): Promise<boolean> => {
  let response = new Response();
  const url = `${apiUrl}/reviews/${reviewId}/is-liked?userId=${userId}`;
  try {
    response = await fetch(url, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error liking Review", error);
    throw new Error("Failed to like Review. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  return await response.json();
};
