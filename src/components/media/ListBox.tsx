import React, { useEffect, useRef, useState } from "react";
import { ListInfo, Media } from "../../utils/type.ts";
import Draggable from "react-draggable";
import { useAuthContext } from "../../contexts/AuthContext.ts";
import { NewListBox } from "./NewListBox.tsx";
import {
  addMediaToList,
  getUserLists,
} from "../../apiUtils/mediaListApiUtil.ts";

export const ListBox = ({
  setShowListBox,
  media,
}: {
  setShowListBox: (value: React.SetStateAction<boolean>) => void;
  media: Media;
}) => {
  const [lists, setLists] = useState<ListInfo[]>([]);
  const [selectedList, setSelectedList] = useState<number>(-1);
  const [showNewListBox, setShowNewListBox] = useState<boolean>(false);
  const { user, setMessage, token } = useAuthContext();
  const listBox = useRef(null);
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const userLists = await getUserLists(user!.id);
        setLists(userLists);
        if (userLists.length > 0) setSelectedList(userLists[0].id);
      } catch (e) {
        const error = e as Error;
        if (error.message === "Response Error")
          setMessage("Error processing request");
        else setMessage("Error fetching your lists");
      }
    };
    fetchLists().then();
  }, [setMessage, user]);
  return (
    <div className="fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      {showNewListBox && (
        <NewListBox
          setShowNewListBox={setShowNewListBox}
          setSelectedList={setSelectedList}
          setLists={setLists}
        />
      )}
      <Draggable cancel=".need-interaction" nodeRef={listBox}>
        <div
          id="message"
          className="flex w-64 flex-col items-start justify-center rounded-lg border-2 bg-white text-center border-Neutral-Mild"
          ref={listBox}
        >
          <label
            htmlFor="chooseList"
            className="w-full rounded-t-lg border-b-2 bg-gray-100 py-1 text-center text-xl font-bold border-Neutral-Mild"
          >
            Add to a List
          </label>
          <div className="flex w-full items-center justify-center py-1 border-Neutral-Mild">
            {lists.length > 0 ? (
              <select
                id="chooseList"
                onChange={(event) => {
                  setSelectedList(parseInt(event.target.value));
                }}
                value={selectedList}
                className="w-full border-b-2 border-gray-400 py-1 text-center align-middle text-xl font-semibold need-interaction focus:outline-0"
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
              <p className="font-semibold">
                You don't have any lists, Please create one.
              </p>
            )}
          </div>
          {lists.length > 0 ? (
            <div className="flex w-full justify-end border-b-2 py-2 font-semibold need-interaction border-Neutral-Mild">
              <span className="mr-4 font-bold py-0.5"> Or:</span>
              <button
                className="mr-2 rounded-md px-1 text-white py-0.5 bg-Neutral-Mild"
                onClick={() => {
                  setShowNewListBox(true);
                }}
              >
                {" "}
                Create a New List
              </button>
            </div>
          ) : (
            <div className="flex w-full justify-center border-b-2 py-2 font-semibold need-interaction border-Neutral-Mild">
              <button
                className="mr-2 rounded-md px-2 text-white py-0.5 bg-Neutral-Mild"
                onClick={() => {
                  setShowNewListBox(true);
                }}
              >
                {" "}
                Create a New List
              </button>
            </div>
          )}
          <div className="flex w-full justify-end rounded-br-lg need-interaction border-Neutral-Mild">
            <button
              className="w-1/8 bg-gray-100 px-2 border-l-2 py-1 hover:bg-Neutral-Mild  border-Neutral-Mild
          focus:ring-1 focus:ring-Neutral transition-colors rounded-br-lg"
              onClick={async () => {
                if (selectedList > -1)
                  try {
                    await addMediaToList(selectedList, media.id, token!);
                    setShowListBox(false);
                    setMessage("Add to list successfully");
                  } catch (e) {
                    const error = e as Error;
                    setMessage(error.message);
                  }
                else {
                  setMessage("Please select a list first");
                }
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowListBox(false);
              }}
              className="w-1/8 bg-gray-100 px-2 border-l-2 py-1 hover:bg-Neutral-Mild  border-Neutral-Mild
          focus:ring-1 focus:ring-Neutral transition-colors rounded-br-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </Draggable>
    </div>
  );
};
