import { ListInfo, User } from "../../utils/type.ts";
import { Link } from "react-router-dom";
import { MyImage } from "../common/MyImage.tsx";
import { useState } from "react";

export function ListHeader({
  lists,
  selectedList,
  userId,
  handleDeleteList,
  user,
}: {
  lists: ListInfo[];
  selectedList: number | undefined;
  userId: string | undefined;
  handleDeleteList: () => void;
  user: User | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const list = lists.filter((list) => list.id === selectedList)[0];
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const truncateContent = (content: string, maxLength: number) => {
    if (expanded) {
      return content;
    }
    return content.length > maxLength
      ? `${content.slice(0, maxLength)}...`
      : content;
  };
  return (
    <div className="flex !md:flex-col justify-start lg:max-w-[75%] mt-4">
      <div className="my-6 mr-2 h-48 w-48 flex-shrink-0">
        <MyImage src={list.imageUrl} alt={list.title} />
      </div>
      <div className="mt-2 w-fit rounded-md py-2 md:mt-4">
        <Link
          to={`/list/${list.id}`}
          className="my-2 text-3xl font-bold text-Neutral"
        >
          {list.title}
        </Link>
        <p className="my-3 text-xl font-semibold">
          {truncateContent(list.description, 400)}
          {list.description.length > 400 && (
            <button
              onClick={toggleExpand}
              className="block rounded-md font-semibold text-Neutral-Strong lg:font-bold"
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          )}
        </p>

        {user?.id === parseInt(userId!) && (
          <button
            className="mb-4 rounded-md text-lg font-semibold text-white p-1.5 bg-Neutral-Mild hover:bg-Neutral"
            onClick={handleDeleteList}
          >
            Delete this list
          </button>
        )}
      </div>
    </div>
  );
}
