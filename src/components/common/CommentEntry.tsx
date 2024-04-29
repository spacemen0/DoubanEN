import { Comment, User } from "../../utils/type.ts";
import { MyImage } from "./MyImage.tsx";
import { apiUrl } from "../../utils/config.ts";
import { useEffect, useState } from "react";
import { fetchUser } from "../../apiUtils/userApiUtil.ts";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useAuthContext } from "../../contexts/AuthContext.ts";
import { deleteComment } from "../../apiUtils/commentApiUtil.ts";

export const CommentEntry = ({
  comment,
  handler,
  own = false,
}: {
  comment: Comment;
  handler: (id: number) => Promise<void>;
  own?: boolean;
}) => {
  const [commentUser, setCommentUser] = useState<User>();
  const { user, token, setMessage } = useAuthContext();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setCommentUser(await fetchUser(comment.userId));
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserData().then();
  }, [comment.userId]);

  const handleDeleteComment = async () => {
    if (token)
      try {
        await deleteComment(comment.id, token);
        await handler(comment.id);
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
  };
  if (commentUser)
    return (
      <div className="flex flex-col rounded-md border-b px-1 py-2">
        <div className="flex h-10 justify-between">
          <div className="flex">
            <div className="h-10 w-10 overflow-hidden rounded-md border">
              {" "}
              <MyImage
                src={apiUrl + commentUser.profileImageUrl}
                alt={commentUser.username}
              />
            </div>

            <span className="ml-1 flex items-center justify-center text-lg font-semibold hover:text-Neutral-Strong">
              {own ? (
                <Link
                  to={`/${comment.commentArea === "User" ? "profile" : comment.commentArea === "MediaList" ? "list" : comment.commentArea === "Media" ? "media" : "review"}/${comment.areaId}`}
                  className="underline text-Neutral-Strong hover:text-Neutral"
                >
                  Go to resource
                </Link>
              ) : (
                <Link to={`/profile/${commentUser.id}`}>
                  {commentUser.username}
                </Link>
              )}
            </span>
          </div>
          <div className="flex justify-end">
            <p className="content-center mr-0.5">{comment.date}</p>
            {user?.id === comment.userId && (
              <button
                className="text-red-500 hover:text-red-700"
                onClick={handleDeleteComment}
              >
                <X size={20} className="align-middle" />
              </button>
            )}
          </div>
        </div>
        <p className="mt-1 font-semibold text-md">{comment.content}</p>
      </div>
    );
};
