import { useEffect, useState } from "react";
import { Media, MediaStatus, Score } from "../../utils/type";
import { MediaItem } from "../common/MediaItem.tsx";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  getUserRatedAndReviewedMediasByType,
  getUserRatedAndReviewedMediaStatusesByType,
} from "../../apiUtils/userMediasApiUtil.ts";
import { EmptyContent } from "../common/EmptyContent.tsx";

export function Collections({ id }: { id: number }) {
  const [selectedOption, setSelectedOption] = useState<
    "Music" | "Movie" | "Book"
  >("Music");
  const [items, setItems] = useState<Media[]>([]);
  const [statuses, setStatuses] = useState<MediaStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const { setMessage } = useAuthContext();

  const handleOptionClick = async (option: "Music" | "Movie" | "Book") => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        const items = await getUserRatedAndReviewedMediasByType(
          id,
          selectedOption,
        );
        setLoading(false);
        setItems(items);
      } catch (error) {
        setMessage(`Error fetching Music Collection items`);
      }
    };

    fetchCollection().then();
  }, [id, selectedOption, setMessage]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        setLoading(true);
        const mediaStatuses = await getUserRatedAndReviewedMediaStatusesByType(
          id,
          selectedOption,
        );
        setLoading(false);
        setStatuses(mediaStatuses);
      } catch (error) {
        setMessage(`Error fetching Music Collection items`);
      }
    };

    fetchStatuses().then();
  }, [id, selectedOption, setMessage]);

  return (
    <div className="flex flex-col border-t-2 bg-gray-100 p-2 text-Neutral-Mild md:p-4 lg:p-6">
      <div className="flex justify-start gap-10 text-lg md:text-xl lg:text-2xl">
        <button
          className={`border-b-2  ${
            selectedOption == "Music" ? "text-Music font-bold" : ""
          }`}
          onClick={() => {
            handleOptionClick("Music").then();
          }}
        >
          Music Collection
        </button>
        <button
          className={`border-b-2  ${
            selectedOption == "Movie" ? "text-Movie font-bold" : ""
          }`}
          onClick={() => {
            handleOptionClick("Movie").then();
          }}
        >
          Movie Collection
        </button>
        <button
          className={`border-b-2  ${
            selectedOption == "Book" ? "text-Book font-bold" : ""
          }`}
          onClick={() => {
            handleOptionClick("Book").then();
          }}
        >
          Book Collection
        </button>
      </div>
      <div className="flex justify-between border-b border-gray-200 py-2 pl-32 text-xl font-semibold text-Neutral-Mild xl:pr-2 2xl:pl-48 3xl:pr-4 3xl:pl-64">
        <span>Average</span> <span>Rated</span> <span>Wants</span>
      </div>
      {items.length > 0
        ? items.map((item) => (
            <div key={item.id} className="mt-4 flex h-auto w-full">
              <MediaItem
                media={item}
                score={
                  statuses.filter((status) => status.mediaId === item.id)
                    .length > 0
                    ? (statuses.filter(
                        (status) => status.mediaId === item.id,
                      )[0].score as Score)
                    : undefined
                }
                text="Their Rating: "
              />
            </div>
          ))
        : !loading && <EmptyContent />}
    </div>
  );
}
