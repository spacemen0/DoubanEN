import { PageHeader } from "../components/common/PageHeader";
import { MediaItem } from "../components/common/MediaItem.tsx";
import { EmptyContent } from "../components/common/EmptyContent.tsx";
import { Link, useSearchParams } from "react-router-dom";
import { Media, MediaType } from "../utils/type.ts";
import { useEffect, useState } from "react";
import { searchMedia } from "../apiUtils/searchApiUtil.ts";
import { NotFound } from "../components/common/NotFound.tsx";
import Loading from "../components/common/Loading.tsx";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [AllMedia, setAllMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const value = searchParams.get("value");
  const option = searchParams.get("option");
  useEffect(() => {
    const fetchSearchResult = async () => {
      if (option && value && ["Music", "Movie", "Book", "All"].includes(option))
        setAllMedia(await searchMedia(option as MediaType, 10, value));
      setLoading(false);
    };
    fetchSearchResult().then();
  }, [option, value]);
  if (option && value && !["Music", "Movie", "Book", "All"].includes(option)) {
    return <NotFound />;
  }
  if (loading) return <Loading />;
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="mt-2 overflow-y-scroll px-2 lg:px-4">
        <h2 className="font-bold text-Neutral text-3xl mx-1 mt-4 ">
          {AllMedia.length + " Results"}
        </h2>

        <div className="flex items-center justify-end rounded-md bg-gray-200 text-lg font-semibold text-Neutral my-2">
          <div className="flex items-center font-semibold text-Neutral-Mild justify-end text-2xl w-full">
            <p className="md:mr-4 !md:mx-2">
              Didn't find what's you looking for?
            </p>
            <Link
              className="p-1 rounded-md !sm:h-16 !sm:px-4 flex items-center text-white bg-Neutral-Mild text-center hover:bg-Neutral text-xl"
              to="/add-media"
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
      </div>
    </div>
  );
}
