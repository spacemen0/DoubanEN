import React from "react";
import { Media } from "../../utils/type.ts";
import { Pagination } from "../common/Pagination.tsx";
import { ListItem } from "../common/ListItem.tsx";
import { EmptyMedias } from "../common/EmptyMedias.tsx";

export function ListMediasDisplay({
  count,
  currentPage,
  setCurrentPage,
  medias,
}: {
  count: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  medias: Media[];
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
