import { Media } from "../../utils/type.ts";
import React from "react";
import { Pagination } from "../common/Pagination.tsx";
import { ListItem } from "../common/ListItem.tsx";
import { EmptyMedias } from "../common/EmptyMedias.tsx";

export function CollectionMediasDisplay({
  medias,
  count,
  type,
  currentPage,
  setCurrentPage,
}: {
  medias: Media[];
  count: number;
  type: string | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <>
      <Pagination
        title={`${count} ${type === "all" ? "Media" : type!.charAt(0).toUpperCase() + type!.slice(1)}s`}
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="my-2 flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:gap-9 lg:pl-36 2xl:pl-44 3xl:pl-56">
        <span>Average</span> <span>Rated</span> <span>Wants</span>
      </div>
      {medias.length > 0 ? (
        medias.map((media, index) => {
          return <ListItem media={media} key={index} />;
        })
      ) : (
        <EmptyMedias />
      )}
    </>
  );
}
