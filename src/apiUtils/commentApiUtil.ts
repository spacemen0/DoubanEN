import { Comment, CommentArea } from "../utils/type.ts";
import { apiUrl } from "../utils/config.ts";

export const postComment = async (
  comment: Comment,
  token: string,
): Promise<Comment> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
  } catch (error) {
    throw new Error("Post comment error");
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  return await response.json();
};

export const deleteComment = async (
  id: number,
  token: string,
): Promise<void> => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Deleting comment error");
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  return;
};
export const getCommentsByUserId = async (
  userId: number,
  page: number,
  size: number = 5,
) => {
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/comments?userId=${userId}&page=${page}&size=${size}`,
    );
  } catch (error) {
    throw new Error("Failed to fetch comments by user ID");
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  const data = await response.json();
  return data["content"];
};

export const getCommentsByAreaAndAreaId = async (
  area: CommentArea,
  areaId: number,
  page: number,
  size: number = 5,
): Promise<Comment[]> => {
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/comments?area=${area}&areaId=${areaId}&page=${page}&size=${size}`,
    );
  } catch (error) {
    throw new Error("Failed to fetch comments by area and area ID");
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  const data = await response.json();
  return data["content"];
};

export const countCommentsByUserId = async (userId: number) => {
  let response = new Response();
  try {
    response = await fetch(`${apiUrl}/comments/count?userId=${userId}`);
  } catch (error) {
    throw new Error("Failed to count comments by user ID");
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  return await response.json();
};

export const countCommentsByAreaAndAreaId = async (
  area: CommentArea,
  areaId: number,
) => {
  let response = new Response();
  try {
    response = await fetch(
      `${apiUrl}/comments/count?area=${area}&areaId=${areaId}`,
    );
  } catch (error) {
    throw new Error("Failed to count comments by area and area ID");
  }
  if (!response.ok) {
    throw new Error("Response error");
  }
  return await response.json();
};
