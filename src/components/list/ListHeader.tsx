import { Link } from "react-router-dom";
import { ListInfo } from "../../utils/type.ts";
import { FullImage } from "../common/FullImage.tsx";
import { apiUrl } from "../../utils/config.ts";
import { NewListBox } from "../common/NewListBox.tsx";
import { useState } from "react";
import { useAuthStore } from "../../contexts/AuthStore.ts";

export function ListHeader({
  listInfo,
  handleDeleteList,
}: {
  listInfo: ListInfo;
  handleDeleteList: (id: number, token: string) => Promise<void>;
}) {
  const [showNewListBox, setShowNewListBox] = useState(false);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  return (
    <div className="flex !md:flex-col justify-start lg:max-w-[75%] mt-4">
      <div className="my-4 mr-2 h-48 w-48 flex-shrink-0">
        <FullImage src={apiUrl + listInfo.imageUrl} alt={listInfo.title} />
      </div>
      <div className="my-4">
        <p className="text-3xl font-bold text-Neutral">{listInfo.title}</p>
        <p className="mt-2 text-2xl text-Neutral">
          Created by:{" "}
          <Link
            className="border-b-2 pb-1 font-semibold text-Neutral border-Neutral-Strong"
            to={`/profile/${listInfo.userId}`}
          >
            {listInfo.username}
          </Link>
        </p>
        <p className="my-4 text-xl">{listInfo.description}</p>
        <div className="flex !md:flex-col !md:pr-40 justify-start md:gap-2">
          {user?.id === listInfo.userId && (
            <button
              className="mb-2 rounded-md text-lg font-semibold text-white p-1.5 bg-Neutral-Mild hover:bg-Neutral"
              onClick={async () => {
                if (token) await handleDeleteList(listInfo.id, token);
              }}
            >
              Delete this list
            </button>
          )}
          {user?.id === listInfo.userId && (
            <button
              className="mb-2 rounded-md text-lg font-semibold text-white p-1.5 bg-Neutral-Mild hover:bg-Neutral"
              onClick={() => {
                setShowNewListBox(!showNewListBox);
              }}
            >
              Edit this list
            </button>
          )}
        </div>
      </div>

      {showNewListBox && (
        <NewListBox
          setShowNewListBox={setShowNewListBox}
          listToBeUpdated={listInfo}
        />
      )}
    </div>
  );
}
