import { MediaType, Review } from "../utils/type.ts";
import { apiUrl } from "../utils/config.ts";

export const getMediaReviewCount = async (id: number): Promise<number> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/reviews/count?mediaId=${id}`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error fetching Reviews Count");
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
    throw new Error("Error Sending Request");
  }

  if (!response.ok) {
    throw new Error("Error Fetching Reviews");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Posting Review");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Setting Reviewed Status");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Cancelling Review Status");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Deleting Review");
  }
};
export const fetchSingleReview = async (id: number): Promise<Review> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/reviews/${id}`, {
      method: "GET",
    });
  } catch (error) {
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching Review");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching User Reviews");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Fetching User Reviews");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Liking Review");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Unliking Review");
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
    throw new Error("Error Sending Request");
  }
  if (!response.ok) {
    throw new Error("Error Checking Liked Status");
  }
  return await response.json();
};
