import { useCallback, useEffect, useState } from "react";
import { Comment, CommentArea } from "../../utils/type.ts";
import {
  countCommentsByAreaAndAreaId,
  getCommentsByAreaAndAreaId,
  postComment,
} from "../../apiUtils/commentApiUtil.ts";
import { CommentEntry } from "./CommentEntry.tsx";
import { useAuthContext } from "../../contexts/AuthContext.ts";
import { getCurrentLocalDate } from "../../utils/helper.ts";

export const CommentSection = ({
  area,
  areaId,
  message = false,
}: {
  area: CommentArea;
  areaId: number;
  message?: boolean;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewCommentBox, setShowNewCommentBox] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const { user, token, setMessage } = useAuthContext();
  const fetchComments = useCallback(async () => {
    try {
      setComments(await getCommentsByAreaAndAreaId(area, areaId, 1));
    } catch (e) {
      const error = e as Error;
      setMessage(error.message);
    }
  }, [area, areaId, setMessage]);
  useEffect(() => {
    fetchComments().then();
  }, [fetchComments]);
  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        setCount(await countCommentsByAreaAndAreaId(area, areaId));
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
    };
    fetchCommentsCount().then();
  }, [area, areaId, setMessage]);

  const handleLoadMore = async () => {
    if (count > comments.length) {
      const newComments = await getCommentsByAreaAndAreaId(
        area,
        areaId,
        currentPage + 1,
      );
      setComments(comments.concat(newComments));
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePostComment = async () => {
    if (user && token) {
      if (commentContent !== "") {
        const comment: Comment = {
          id: 0,
          userId: user.id,
          content: commentContent,
          commentArea: area,
          areaId: areaId,
          date: getCurrentLocalDate(),
        };
        try {
          await postComment(comment, token);
          setCommentContent("");
          setShowNewCommentBox(false);
          await fetchComments();
          setCount((prevState) => prevState + 1);
          setCurrentPage(1);
        } catch (e) {
          const error = e as Error;
          setMessage(error.message);
        }
      } else {
        setMessage("Please write something");
      }
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

  return (
    <>
      <h2 className="my-4 text-2xl font-bold">
        {message ? "Message Wall" : "Comments"}
      </h2>
      <div className="rounded-md border px-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentEntry
              key={comment.id}
              comment={comment}
              handler={handleAfterDeletingComment}
            />
          ))
        ) : (
          <p className="mt-6 text-center text-xl font-semibold">
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
          {showNewCommentBox && (
            <div>
              <label
                htmlFor="content"
                className="ml-2 block text-lg font-medium text-Neutral-Strong"
              >
                {message ? "Write your message" : "Write your comment"}
              </label>
              <input
                className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200
              focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                type="text"
                id="content"
                name="content"
                onChange={(e) => {
                  setCommentContent(e.target.value);
                }}
              />
              <button
                className="flex justify-center mt-2 w-full rounded-md p-2  text-white transition-colors
               duration-300 bg-Neutral-Mild hover:bg-Neutral focus:bg-Neutral-Mild focus:ring-Neutral-Mild
                focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={handlePostComment}
              >
                Submit
              </button>
            </div>
          )}
          <button
            className="flex justify-center mt-2  w-full rounded-md p-2 text-white transition-colors duration-300
          bg-Neutral-Mild hover:bg-Neutral focus:bg-Neutral-Mild focus:ring-Neutral-Mild
          focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={() => {
              if (!user) {
                setMessage("Please log in");
              } else setShowNewCommentBox(!showNewCommentBox);
            }}
          >
            {showNewCommentBox
              ? "Cancel"
              : message
                ? "Post Message"
                : "Post Comment"}
          </button>
        </div>
      </div>
    </>
  );
};
