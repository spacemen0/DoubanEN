import { useEffect, useState } from "react";
import { Media, MediaStatus, RatingScore } from "../../utils/type";
import { MediaItem } from "../common/MediaItem.tsx";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  getMediaByTypeAndUserStatusWithPagination,
  getMediaStatusesByTypeAndUserIdWithPagination,
  getUserMediaCountByType,
} from "../../apiUtils/userMediaApiUtil.ts";
import { EmptyContent } from "../common/EmptyContent.tsx";
import { Pagination } from "../common/Pagination.tsx";

export function Ratings({ id, username }: { id: number; username: string }) {
  const [selectedOption, setSelectedOption] = useState<
    "Music" | "Movie" | "Book"
  >("Music");
  const [items, setItems] = useState<Media[]>([]);
  const [statuses, setStatuses] = useState<MediaStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { setMessage } = useAuthContext();

  const handleOptionClick = async (option: "Music" | "Movie" | "Book") => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);
        setCount(await getUserMediaCountByType(id, selectedOption, "Rated"));
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
    };
    fetchCount().then();
  }, [id, selectedOption, setMessage]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setLoading(true);
        const items = await getMediaByTypeAndUserStatusWithPagination(
          id,
          selectedOption,
          "Rated",
          currentPage,
        );
        setItems(items);
      } catch (error) {
        setMessage(`Error fetching Music Collection items`);
      }
    };

    fetchRatings().then();
  }, [currentPage, id, selectedOption, setMessage]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        setLoading(true);
        const mediaStatuses =
          await getMediaStatusesByTypeAndUserIdWithPagination(
            id,
            selectedOption,
            "Rated",
            currentPage,
          );
        setLoading(false);
        setStatuses(mediaStatuses);
      } catch (error) {
        setLoading(false);
        setMessage(`Error fetching Music Collection items`);
      }
    };

    fetchStatuses().then();
  }, [currentPage, id, selectedOption, setMessage]);

  return (
    <div className="flex flex-col border-t-2 bg-gray-100 p-2 text-Neutral-Mild md:p-4 lg:p-6">
      <h2 className="mb-3 text-3xl font-semibold text-Neutral-Mild">
        {username}'s Ratings
      </h2>
      <Pagination
        title={count + " Ratings"}
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex justify-start gap-10 text-2xl">
        <button
          className={`border-b-2  ${
            selectedOption == "Music" ? "text-Music font-bold" : ""
          }`}
          onClick={() => {
            handleOptionClick("Music").then();
          }}
        >
          Music
        </button>
        <button
          className={`border-b-2  ${
            selectedOption == "Movie" ? "text-Movie font-bold" : ""
          }`}
          onClick={() => {
            handleOptionClick("Movie").then();
          }}
        >
          Movie
        </button>
        <button
          className={`border-b-2  ${
            selectedOption == "Book" ? "text-Book font-bold" : ""
          }`}
          onClick={() => {
            handleOptionClick("Book").then();
          }}
        >
          Book
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
                      )[0].score as RatingScore)
                    : undefined
                }
                text="Their Rating: "
                date={
                  statuses.filter((status) => status.mediaId === item.id)
                    .length > 0
                    ? statuses.filter((status) => status.mediaId === item.id)[0]
                        .date
                    : undefined
                }
              />
            </div>
          ))
        : !loading && <EmptyContent />}
    </div>
  );
}
