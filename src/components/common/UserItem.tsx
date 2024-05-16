import { FullImage } from "./FullImage.tsx";
import { apiUrl } from "../../utils/config.ts";
import { Link } from "react-router-dom";
import { User } from "../../utils/type.ts";

export const UserItem = ({ user }: { user: User }) => {
  return (
    <div className="flex h-10">
      <div className="h-10 w-10 overflow-hidden rounded-md border">
        {" "}
        <FullImage src={apiUrl + user.profileImageUrl} alt={user.username} />
      </div>

      <span className="ml-3 flex items-center justify-center text-2xl font-semibold hover:text-Neutral-Strong">
        <Link to={`/profile/${user.id}`}>{user.username}</Link>
      </span>
    </div>
  );
};
