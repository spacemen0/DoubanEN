import { useCallback, useEffect, useState } from "react";
import { Comment } from "../../utils/type.ts";
import {
  countCommentsByUserId,
  getCommentsByUserId,
} from "../../apiUtils/commentApiUtil.ts";
import { CommentEntry } from "../common/CommentEntry.tsx";
import { useAuthContext } from "../../contexts/AuthContext.ts";

export const OwnComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuthContext();
  const fetchComments = useCallback(async () => {
    if (user)
      try {
        setComments(await getCommentsByUserId(user.id, 1));
      } catch (e) {
        console.log(e);
      }
  }, [user]);
  useEffect(() => {
    fetchComments().then();
  }, [fetchComments]);
  useEffect(() => {
    const fetchCommentsCount = async () => {
      if (user)
        try {
          setCount(await countCommentsByUserId(user.id));
        } catch (e) {
          console.log(e);
        }
    };
    fetchCommentsCount().then();
  }, [user]);

  const handleLoadMore = async () => {
    if (count > comments.length && user) {
      const newComments = await getCommentsByUserId(user.id, currentPage + 1);
      setComments(comments.concat(newComments));
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAfterDeletingComment = async (id: number) => {
    setComments((prevState) =>
      prevState.filter((comment) => comment.id !== id),
    );
    if (comments.length > 1 && comments.length - (1 % 5) === 0)
      setCurrentPage((prevState) => prevState - 1);
    setCount((prevState) => (prevState > 0 ? prevState - 1 : prevState));
  };

  if (user)
    return (
      <>
        <h2 className="my-4 text-2xl font-bold">My Comments</h2>
        <div className="rounded-md border px-2">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentEntry
                key={comment.id}
                comment={comment}
                own={true}
                handler={handleAfterDeletingComment}
              />
            ))
          ) : (
            <p className="font-semibold text-center mt-6 text-xl">
              Nothing to show here
            </p>
          )}
          <div className="p-4">
            {comments.length > 0 && (
              <button
                onClick={handleLoadMore}
                className={`flex w-full justify-center mt-2  rounded-md p-2 text-white transition-colors duration-300
              bg-Neutral-Mild ${
                count <= comments.length
                  ? "cursor-not-allowed"
                  : `hover:bg-Neutral focus:bg-Neutral-Mild focus:ring-Neutral-Mild
              focus:outline-none focus:ring-2 focus:ring-offset-2`
              }`}
              >
                Load More ({count - comments.length})
              </button>
            )}
          </div>
        </div>
      </>
    );
};
