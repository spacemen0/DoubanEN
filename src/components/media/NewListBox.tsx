import React, { useRef, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import Draggable from "react-draggable";
import { createList } from "../../apiUtils/mediaListApiUtil.ts";
import { ListInfo } from "../../utils/type.ts";

export const NewListBox = ({
  setShowNewListBox,
  setSelectedList,
  setLists,
}: {
  setShowNewListBox: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedList: React.Dispatch<React.SetStateAction<number>>;
  setLists: React.Dispatch<React.SetStateAction<ListInfo[]>>;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user, setMessage, token } = useAuthContext();
  const listBox = useRef(null);

  const handleReset = () => {
    setTitle("");
    setDescription("");
  };

  const handleCreateList = async () => {
    try {
      const newList = await createList(user!.id, title, description, token!);
      setShowNewListBox(false);
      setSelectedList(newList.id);
      setLists((prevLists) => [...prevLists, newList]);
      setMessage("You list has been created");
    } catch (e) {
      setMessage("Error creating list");
    }
  };
  return (
    <div className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <Draggable cancel=".need-interaction" nodeRef={listBox}>
        <div
          id="message"
          className="w-72 rounded-lg border-2 bg-white text-center border-Neutral-Mild md:w-96 lg:w-[480px]"
          ref={listBox}
        >
          <label
            htmlFor="message"
            className="block rounded-t-lg border-b-2 bg-gray-100 px-4 py-2 text-xl font-semibold text-Neutral-Strong border-Neutral-Mild"
          >
            New List
          </label>
          <textarea
            rows={1}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border-b-2 bg-white font-semibold need-interaction p-2.5 text-Neutral-Strong border-Neutral-Mild focus:ring-Neutral-Mild focus:outline-none"
            placeholder="Title"
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          ></textarea>
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="hidden w-full bg-white need-interaction p-2.5 text-Neutral focus:outline-none lg:block"
            placeholder="Write your list description here..."
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          ></textarea>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white need-interaction p-2.5 text-Neutral focus:outline-none lg:hidden"
            placeholder="Write your review here..."
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          ></textarea>
          <div className="flex w-full justify-end rounded-br-lg border-t-2 need-interaction border-Neutral-Mild">
            <button
              className="w-1/8 bg-gray-100 px-2 border-l-2 py-1 hover:bg-Neutral-Mild  border-Neutral-Mild
         focus:ring-1 focus:ring-Neutral transition-colors"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="w-1/8 bg-gray-100 px-2 border-l-2 py-1 hover:bg-Neutral-Mild  border-Neutral-Mild
          focus:ring-1 focus:ring-Neutral transition-colors rounded-br-lg"
              onClick={handleCreateList}
            >
              Create
            </button>
            <button
              className="w-1/8 bg-gray-100 px-2 border-l-2 py-1 hover:bg-Neutral-Mild  border-Neutral-Mild
         focus:ring-1 focus:ring-Neutral transition-colors"
              onClick={() => {
                setShowNewListBox(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Draggable>
    </div>
  );
};
