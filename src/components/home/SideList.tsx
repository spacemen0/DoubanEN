import { useEffect, useState } from "react";
import { Media } from "../../utils/type";
import { MediaItem } from "../common/MediaItem.tsx";
import { getUserMediaByTypeWithPagination } from "../../apiUtils/userMediaApiUtil.ts";
import { homePageEditorMediaIds } from "../../utils/data.ts";
import { getMedia } from "../../apiUtils/mediaApiUtil.ts";
import { useAuthStore } from "../../contexts/AuthStore.ts";

export function SideList() {
  const [selectedOption, setSelectedOption] = useState<"Editor" | "My">(
    "Editor"
  );
  const [items, setItems] = useState<Media[]>([]);
  const user = useAuthStore((state) => state.user);
  const setMessage = useAuthStore((state) => state.setMessage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedOption === "My" && user) {
          const itemsRated = await getUserMediaByTypeWithPagination(
            user.id,
            "All",
            1,
            "Rated",
            5
          );
          const itemsReviewed = await getUserMediaByTypeWithPagination(
            user.id,
            "All",
            1,
            "Reviewed",
            5
          );
          setItems(itemsRated.concat(itemsReviewed));
        } else if (selectedOption === "Editor" && items.length === 0) {
          for (const homePageEditorMediaId of homePageEditorMediaIds) {
            const editorItem = await getMedia(homePageEditorMediaId);
            setItems((prevState) => [...prevState, editorItem]);
          }
        }
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
    };

    fetchData().then();
  }, [selectedOption, user, setMessage, items.length]);

  const handleOptionClick = async (option: "Editor" | "My") => {
    setSelectedOption(option);
  };

  return (
    <div className="mt-6 flex flex-col text-Neutral-Mild lg:mt-12 lg:w-10/12">
      <div className="text-2xl font-bold text-Neutral-Mild xl:text-3xl">
        Featured Collection
      </div>
      <div className="my-4 flex justify-start gap-10">
        <button
          className={`border-b-2 text-xl lg:text-2xl ${
            selectedOption === "Editor" ? "text-Neutral-Mild font-bold" : ""
          }`}
          onClick={() => handleOptionClick("Editor")}
        >
          Editor's Selection
        </button>
        <button
          className={`border-b-2 text-xl lg:text-2xl ${
            selectedOption === "My" ? "text-Neutral-Mild font-bold" : ""
          }`}
          onClick={() => handleOptionClick("My")}
        >
          My Collection
        </button>
      </div>
      <div className="flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:justify-end lg:gap-9 lg:pl-0">
        <span>Average</span> <span>Rated</span> <span>Wants</span>
      </div>
      {(selectedOption === "Editor" || (selectedOption === "My" && user)) &&
        items.map((item, index) => (
          <div key={index} className="mt-4 flex h-auto w-full overflow-clip">
            <MediaItem media={item} />
          </div>
        ))}
      {selectedOption === "My" && !user && (
        <p className="mt-2 text-xl">
          Create a new account or sign in to keep track of your favorites
        </p>
      )}
    </div>
  );
}
