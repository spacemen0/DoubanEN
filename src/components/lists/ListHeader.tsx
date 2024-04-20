import { ListInfo, User } from "../../utils/type.ts";
import { Link } from "react-router-dom";
import { MyImage } from "../common/MyImage.tsx";
import React, { useState } from "react";
import { NewListBox } from "../common/NewListBox.tsx";
import { apiUrl } from "../../utils/config.ts";

export function ListHeader({
  lists,
  setLists,
  selectedList,
  setSelectedList,
  userId,
  handleDeleteList,
  setChanged,
  user,
}: {
  lists: ListInfo[];
  setLists: React.Dispatch<React.SetStateAction<ListInfo[]>>;
  selectedList: number | undefined;
  setSelectedList: React.Dispatch<React.SetStateAction<number>>;
  userId: string | undefined;
  handleDeleteList: () => void;
  setChanged: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showNewListBox, setShowNewListBox] = useState(false);
  const [edit, setEdit] = useState(false);
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
        <MyImage src={apiUrl + list.imageUrl} alt={list.title} />
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
              className="block rounded-md font-semibold text-Neutral lg:font-bold"
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          )}
        </p>
        <div className="flex !md:flex-col !md:pr-40 justify-start md:gap-2">
          {user?.id === parseInt(userId!) && (
            <button
              className="mb-2 rounded-md text-lg  font-semibold text-white p-1.5 bg-Neutral-Mild hover:bg-Neutral"
              onClick={handleDeleteList}
            >
              Delete this list
            </button>
          )}
          {user?.id === parseInt(userId!) && (
            <button
              className="mb-2 rounded-md text-lg  font-semibold text-white p-1.5 bg-Neutral-Mild hover:bg-Neutral"
              onClick={() => {
                setShowNewListBox(!showNewListBox);
                setEdit(true);
              }}
            >
              Edit this list
            </button>
          )}
          {user?.id === parseInt(userId!) && (
            <button
              className="mb-2 rounded-md text-lg  font-semibold text-white p-1.5 bg-Neutral-Mild hover:bg-Neutral"
              onClick={() => {
                setShowNewListBox(!showNewListBox);
              }}
            >
              Create new list
            </button>
          )}
        </div>
        {showNewListBox && (
          <NewListBox
            setShowNewListBox={setShowNewListBox}
            setLists={setLists}
            setSelectedList={setSelectedList}
            listToBeUpdated={edit ? list : undefined}
            setChanged={setChanged}
          />
        )}
      </div>
    </div>
  );
}
