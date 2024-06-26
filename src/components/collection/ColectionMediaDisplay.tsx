import { Media } from "../../utils/type.ts";
import React from "react";
import { Pagination } from "../common/Pagination.tsx";
import { MediaItem } from "../common/MediaItem.tsx";
import { EmptyContent } from "../common/EmptyContent.tsx";

export function CollectionMediaDisplay({
  media,
  count,
  type,
  currentPage,
  setCurrentPage,
}: {
  media: Media[];
  count: number;
  type: string | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <>
      <Pagination
        title={`${count} ${type === "All" ? "Item" : type}s`}
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="my-2 flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:gap-9 lg:pl-36 2xl:pl-44 3xl:pl-56">
        <span>Average</span> <span>Rated</span> <span>Wants</span>
      </div>
      {media.length > 0 ? (
        media.map((media, index) => {
          return <MediaItem media={media} key={index} />;
        })
      ) : (
        <EmptyContent />
      )}
    </>
  );
}
