import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext.ts";
import Draggable from "react-draggable";
import { createList, editList } from "../../apiUtils/mediaListApiUtil.ts";
import { ListInfo } from "../../utils/type.ts";

export const NewListBox = ({
  setShowNewListBox,
  setSelectedList,
  setLists,
  setChanged,
  listToBeUpdated,
}: {
  setShowNewListBox: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedList?: React.Dispatch<React.SetStateAction<number>>;
  setLists?: React.Dispatch<React.SetStateAction<ListInfo[]>>;
  setChanged?: React.Dispatch<React.SetStateAction<boolean>>;
  listToBeUpdated?: ListInfo;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user, setMessage, token } = useAuthContext();
  const [file, setFile] = useState<File | null>(null);
  const listBox = useRef(null);

  useEffect(() => {
    if (listToBeUpdated) {
      setTitle(listToBeUpdated.title);
      setDescription(listToBeUpdated.description);
    }
  }, [listToBeUpdated]);

  const handleReset = () => {
    setTitle("");
    setDescription("");
  };

  const handleSubmitList = async () => {
    if (user && token && title !== "" && description !== "")
      try {
        let newList: ListInfo;
        if (listToBeUpdated)
          if (file)
            newList = await editList(
              user.id,
              listToBeUpdated.id,
              title,
              description,
              token,
              file,
            );
          else {
            newList = await editList(
              user.id,
              listToBeUpdated.id,
              title,
              description,
              token,
            );
          }
        else if (file)
          newList = await createList(user.id, title, description, token, file);
        else {
          setMessage("Must choose a cover image when creating new lists");
          return;
        }
        setShowNewListBox(false);
        setChanged && setChanged(true);
        setSelectedList && setSelectedList(newList.id);
        setLists && setLists((prevLists) => [...prevLists, newList]);
        setMessage(
          `You list has been ${listToBeUpdated ? "Updated" : "Created"}`,
        );
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
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
            {listToBeUpdated ? "Update your list" : "New list"}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(event) => {
              const fileList = event.target.files;
              const file = fileList && fileList.item(0);
              if (file) {
                if (file.size < 1024 * 1024) setFile(file);
                else {
                  event.target.value = "";
                  setMessage("File size exceeds the limit (1MB)");
                }
              }
            }}
            accept="image/jpeg"
            className="h-12 file:h-full w-full cursor-pointer file:before:content-['Select'] file:rounded-sm border-Neutral-Mild file:border-0 border-b-2 bg-white file:text-white transition-colors duration-300 file:bg-Neutral-Strong placeholder:text-l focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          />
          <textarea
            rows={1}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border-b-2 bg-white font-semibold need-interaction p-2.5 text-Neutral-Strong border-Neutral-Mild focus:ring-Neutral-Mild focus:outline-none"
            placeholder="List Title"
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
            placeholder="Write your list description here..."
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
          focus:ring-1 focus:ring-Neutral transition-colors "
              onClick={handleSubmitList}
            >
              {listToBeUpdated ? "Update" : "Create"}
            </button>
            <button
              className="w-1/8 bg-gray-100 px-2 border-l-2 py-1 hover:bg-Neutral-Mild  border-Neutral-Mild
         focus:ring-1 focus:ring-Neutral transition-colors rounded-br-lg"
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
