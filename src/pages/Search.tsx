import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { MediaItem } from "../components/common/MediaItem.tsx";
import { EmptyContent } from "../components/common/EmptyContent.tsx";
import { Link, useSearchParams } from "react-router-dom";
import { Media, MediaType } from "../utils/type.ts";
import { useCallback, useEffect, useState } from "react";
import { searchMedia } from "../apiUtils/searchApiUtil.ts";
import { NotFound } from "../components/common/NotFound.tsx";
import Loading from "../components/common/Loading.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { useAuthStore } from "../contexts/AuthStore.ts";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [AllMedia, setAllMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const setMessage = useAuthStore((state) => state.setMessage);
  const value = searchParams.get("value");
  const option = searchParams.get("option");
  const fetchSearchResult = useCallback(
    async (page: number) => {
      if (
        !option ||
        !value ||
        !["Music", "Movie", "Book", "All"].includes(option)
      ) {
        setAllMedia([]);
        setLoading(false);
        return;
      }
      try {
        const results = await searchMedia(option as MediaType, page, 5, value);
        if (page === 1) {
          setAllMedia(results);
          setCurrentPage(1);
        } else {
          setAllMedia((prevState) => [...prevState, ...results]);
        }
        if (results.length === 0) {
          setMessage("No results found");
        }
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
      setLoading(false);
    },
    [option, setMessage, value]
  );
  useEffect(() => {
    fetchSearchResult(1).then();
  }, [fetchSearchResult]);

  if (option && value && !["Music", "Movie", "Book", "All"].includes(option)) {
    return <NotFound />;
  }
  if (loading) return <Loading />;
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll flex flex-col h-screen justify-between">
        <div className="mt-2 overflow-y-scroll px-2 lg:px-4">
          <h2 className="mx-1 mt-4 text-3xl font-bold text-Neutral">Results</h2>

          <div className="my-2 flex items-center justify-end rounded-md bg-gray-200 text-lg font-semibold text-Neutral">
            <div className="flex w-full items-center justify-end text-2xl font-semibold text-Neutral-Mild">
              <p className="md:mr-4 !md:mx-2">
                Didn't find what's you looking for?
              </p>
              <Link
                className="p-1 rounded-md !sm:h-16 !sm:px-4 flex items-center text-white bg-Neutral-Mild text-center hover:bg-Neutral text-xl"
                to="/contribute"
              >
                Add New
              </Link>
            </div>
          </div>
          <div className="my-2 flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:gap-9 lg:pl-36 2xl:pl-44 3xl:pl-56">
            <span>Average</span> <span>Rated</span> <span>Wants</span>
          </div>
          {AllMedia.length > 0 ? (
            <ul>
              {AllMedia.map((media, index) => (
                <li key={index}>
                  <MediaItem media={media} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyContent />
          )}
          <div className="flex w-full items-center justify-center bg-transparent mt-2">
            <button
              className="flex w-36 justify-center rounded-md p-2 text-xl font-semibold text-white transition-colors duration-300 bg-Neutral-Mild hover:bg-Neutral focus:bg-Neutral-Mild focus:ring-Neutral-Mild focus:outline-none md:w-48 md:text-2xl md:font-bold lg:w-96"
              onClick={async () => {
                setCurrentPage(currentPage + 1);
                await fetchSearchResult(currentPage + 1);
              }}
            >
              Load More
            </button>
          </div>
        </div>{" "}
        <Footer />
      </div>
    </div>
  );
}
