import { Media, User } from "../../utils/type.ts";
import { Pagination } from "../common/Pagination.tsx";
import { MediaItem } from "../common/MediaItem.tsx";
import { X } from "lucide-react";
import { EmptyContent } from "../common/EmptyContent.tsx";
import React from "react";

export function ListMediasDisplay({
  medias,
  count,
  currentPage,
  setCurrentPage,
  handleRemoveListItem,
  userId,
  user,
}: {
  medias: Media[];
  count: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  selectedList: number | undefined;
  handleRemoveListItem: (mediaId: number) => void;
  userId: string | undefined;
  user: User | null;
}) {
  return (
    <>
      {" "}
      <Pagination
        title={`${count} List Items`}
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="my-2 flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:gap-9 lg:pl-36 2xl:pl-44 3xl:pl-56">
        <span>Average</span> <span>Rated</span> <span>Wants</span>
      </div>
      {medias.length > 0 ? (
        <ul>
          {medias.map((media, index) => (
            <li className="relative" key={index}>
              <MediaItem media={media} />
              {user?.id === parseInt(userId!) && (
                <button
                  className="absolute top-0 right-2"
                  onClick={async () => {
                    handleRemoveListItem(media.id);
                  }}
                >
                  <X
                    color={
                      media.type === "Music"
                        ? "#0A8F08"
                        : media.type === "Movie"
                          ? "#039BE5"
                          : "#B0120A"
                    }
                    size="28px"
                  />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <EmptyContent />
      )}
    </>
  );
}
