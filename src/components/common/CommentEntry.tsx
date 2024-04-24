import { Comment, User } from "../../utils/type.ts";
import { MyImage } from "./MyImage.tsx";
import { apiUrl } from "../../utils/config.ts";
import { useEffect, useState } from "react";
import { fetchUser } from "../../apiUtils/userApiUtil.ts";
import { Link } from "react-router-dom";

export const CommentEntry = ({ comment }: { comment: Comment }) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUser(await fetchUser(comment.userId));
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserData().then();
  }, [comment.userId]);
  if (user)
    return (
      <div className="flex flex-col rounded-md border-b px-1 py-2">
        <div className="flex h-10 justify-between">
          <div className="flex">
            <div className="h-10 w-10 overflow-hidden rounded-md border">
              {" "}
              <MyImage
                src={apiUrl + user.profileImageUrl}
                alt={user.username}
              />
            </div>

            <span className="ml-1 flex items-center justify-center text-lg font-semibold hover:text-Neutral-Strong">
              <Link to={`/profile/${user.id}`}>{user.username}</Link>
            </span>
          </div>
          <p>{comment.date}</p>
        </div>
        <p className="mt-1 font-semibold text-md">{comment.content}</p>
      </div>
    );
};
