import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Media, MediaType } from "../utils/type";
import { useAuthContext } from "../contexts/AuthContext";
import { NotFound } from "../components/common/NotFound";
import { PageHeader } from "../components/common/PageHeader";
import {
  getUserMediaCountByType,
  getUserMediasByTypeWithPagination,
} from "../utils/services/userMediasService";
import { Pagination } from "../components/common/Pagination";
import { ListItem } from "../components/common/ListItem";
import { EmptyMedias } from "../components/common/EmptyMedias";

export default function Collection() {
  const { type } = useParams();
  const [medias, setMedias] = useState<Media[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<
    "Rated" | "Wishlist" | "Doing" | "Reviewed"
  >("Rated");
  const { setMessage, user } = useAuthContext();
  useEffect(() => {
    const fetchReviewsCount = async (type: MediaType | "All") => {
      if (user)
        try {
          const fetchedCount = await getUserMediaCountByType(
            user.id,
            type,
            selectedOption,
          );
          setCount(fetchedCount);
        } catch (error) {
          setMessage(`Error fetching total number of ${type}s`);
        }
    };
    fetchReviewsCount(
      (type!.charAt(0).toUpperCase() + type!.slice(1)) as MediaType,
    ).then();
  }, [selectedOption, setMessage, type, user]);

  useEffect(() => {
    const fetchAllMedias = async () => {
      if (user)
        setMedias(
          await getUserMediasByTypeWithPagination(
            user.id,
            (type!.charAt(0).toUpperCase() + type!.slice(1)) as
              | MediaType
              | "All",
            currentPage,
            selectedOption,
          ),
        );
    };
    fetchAllMedias().then();
  }, [currentPage, selectedOption, type, user]);

  if (!["music", "movie", "book", "all"].includes(type!)) {
    return <NotFound />;
  }

  function handleOptionClick(
    status: "Rated" | "Wishlist" | "Doing" | "Reviewed",
  ) {
    setSelectedOption(status);
  }

  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="mt-2 overflow-y-scroll px-2 lg:px-4">
        <div className="mt-4 flex justify-start gap-4 text-lg font-semibold text-Neutral-Mild md:py-0.5 md:text-2xl lg:gap-10 lg:text-3xl">
          <button
            className={`border-b-2  ${
              selectedOption == "Rated" ? " font-bold" : ""
            }`}
            onClick={() => {
              handleOptionClick("Rated");
            }}
          >
            Rated
          </button>
          <button
            className={`border-b-2  ${
              selectedOption == "Doing" ? "font-bold" : ""
            }`}
            onClick={() => {
              handleOptionClick("Doing");
            }}
          >
            Listening / Watching / Reading
          </button>
          <button
            className={`border-b-2  ${
              selectedOption == "Wishlist" ? "font-bold" : ""
            }`}
            onClick={() => {
              handleOptionClick("Wishlist");
            }}
          >
            Wishlist
          </button>
          <button
            className={`border-b-2  ${
              selectedOption == "Reviewed" ? "font-bold" : ""
            }`}
            onClick={() => {
              handleOptionClick("Reviewed");
            }}
          >
            Reviewed
          </button>
        </div>
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
      </div>
    </div>
  );
}
