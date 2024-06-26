import React from "react";
import { Media } from "../../utils/type.ts";
import { Pagination } from "../common/Pagination.tsx";
import { MediaItem } from "../common/MediaItem.tsx";
import { EmptyContent } from "../common/EmptyContent.tsx";

export function ListMediaDisplay({
  count,
  currentPage,
  setCurrentPage,
  media,
}: {
  count: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  media: Media[];
}) {
  return (
    <>
      <Pagination
        title={`${count} List Items`}
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="my-2 flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:gap-9 lg:pl-36 2xl:pl-44 3xl:pl-56">
        <span>Average</span> <span>Rated</span> <span>Wants</span>
      </div>
      {media.length > 0 ? (
        <ul>
          {media.map((media, index) => (
            <li key={index}>
              <MediaItem media={media} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyContent />
      )}
    </>
  );
}
