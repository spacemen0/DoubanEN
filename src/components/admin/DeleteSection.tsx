import { useState } from "react";
import { deleteList } from "../../apiUtils/mediaListApiUtil.ts";
import { deleteComment } from "../../apiUtils/commentApiUtil.ts";
import { deleteMedia } from "../../apiUtils/mediaApiUtil.ts";
import { deleteAuthor } from "../../apiUtils/authorApiUtil.ts";
import { useAuthStore } from "../../contexts/AuthStore.ts";

export function DeleteSection() {
  const [id, setId] = useState<number>(0);
  const [type, setType] = useState("Media");

  const token = useAuthStore((state) => state.token);
  const setMessage = useAuthStore((state) => state.setMessage);
  const handleDelete = async () => {
    if (id !== -1 && token)
      try {
        if (type === "Media") await deleteMedia(id, token);
        else if (type === "List") await deleteList(id, token);
        else if (type === "Comment") await deleteComment(id, token);
        else if (type === "Author") await deleteAuthor(id, token);
        else {
          setMessage("Wrong resource type");
          return;
        }
        setType("Media");
        setId(0);
        setMessage("Deleted");
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
  };
  return (
    <div className="flex !lg:flex-col border-2 rounded-md mt-2 p-2 justify-start items-center">
      <h1 className="text-2xl my-2 mx-2 font-semibold text-Neutral">
        Delete Resources
      </h1>
      <div className="m-2 rounded-md border p-2 px-4">
        <label
          htmlFor="id"
          className="block text-2xl my-4 font-semibold text-Neutral"
        >
          ID of the Resource to be deleted
        </label>
        <input
          type="number"
          id="message"
          name="message"
          value={id}
          onChange={(e) => {
            setId(parseInt(e.target.value));
          }}
          className="mt-1 w-full rounded-md border p-2  transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        />
      </div>
      <div className="rounded-md border p-2 m-2 px-4">
        <label
          htmlFor="type"
          className="block text-2xl my-4 font-semibold text-Neutral"
        >
          Type of the Item
        </label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
          className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          <option value="Media">Media</option>
          <option value="List">List</option>
          <option value="Comment">Comment</option>
          <option value="Author">Author</option>
        </select>
      </div>
      <div className="flex mt-2">
        <button
          onClick={() => {
            handleDelete().then();
          }}
          className="mr-2 flex w-20 justify-center rounded-md p-2  text-white
                   transition-colors duration-300 bg-Neutral-Strong hover:bg-Neutral focus:bg-Neutral-Strong
                   focus:ring-Neutral-Strong focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
