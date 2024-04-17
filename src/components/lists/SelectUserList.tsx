import { ListInfo } from "../../utils/type.ts";
import React from "react";

export function SelectUserList({
  username,
  lists,
  setSelectedList,
  selectedList,
  setCurrentPage,
}: {
  username: string | undefined;
  lists: ListInfo[];
  setSelectedList: React.Dispatch<React.SetStateAction<number>>;
  selectedList: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="mx-2 mt-4 flex !md:flex-col !md:gap-2 items-center justify-center text-xl font-semibold md:mt-8 md:gap-4 md:text-3xl lg:font-bold">
      <h1>{username}'s Lists:</h1>
      {lists.length > 0 ? (
        <select
          id="chooseList"
          onChange={(event) => {
            setCurrentPage(1);
            setSelectedList(parseInt(event.target.value));
          }}
          onFocus={(event) => {
            setSelectedList(parseInt(event.target.value));
          }}
          value={selectedList}
          className="mx-2 border-b-2 border-gray-400 py-1 text-center align-middle  focus:outline-0"
        >
          {lists.map((list) => (
            <option value={list.id} key={list.id}>
              {list.title}
            </option>
          ))}
          {lists.length === 1 && (
            <option value={lists[0].id} key={lists[0].id} hidden>
              {lists[0].title}
            </option>
          )}
        </select>
      ) : (
        <p className="">No lists were found.</p>
      )}
    </div>
  );
}
