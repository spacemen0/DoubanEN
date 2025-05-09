import { useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { NotFound } from "../components/common/NotFound";
import { useEffect, useState } from "react";
import { Media, MediaType } from "../utils/type";
import { MediaItem } from "../components/common/MediaItem.tsx";
import { Pagination } from "../components/common/Pagination";
import {
  getAllMediaByType,
  getAllMediaCountByType,
} from "../apiUtils/mediaApiUtil.ts";
import { EmptyContent } from "../components/common/EmptyContent.tsx";
import Loading from "../components/common/Loading.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { useAuthStore } from "../contexts/AuthStore.ts";

export default function MediaByType() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const setMessage = useAuthStore((state) => state.setMessage);
  useEffect(() => {
    setCurrentPage(1);
  }, [type]);
  useEffect(() => {
    const fetchMediaCount = async (type: MediaType) => {
      setLoading(true);
      try {
        const fetchedCount = await getAllMediaCountByType(type);
        setCount(fetchedCount);
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
    };
    type && fetchMediaCount(type as MediaType).then();
  }, [setMessage, type]);

  useEffect(() => {
    const fetchAllMedia = async () => {
      setLoading(true);
      try {
        setMedia(await getAllMediaByType(type as MediaType, currentPage));
        setLoading(false);
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
    };
    type && fetchAllMedia().then();
  }, [currentPage, setMessage, type]);
  if (!type || !["Music", "Movie", "Book", "All"].includes(type)) {
    return <NotFound />;
  }
  if (loading) return <Loading />;

  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll h-screen flex flex-col justify-between">
        <div className="mt-2  px-2 lg:px-4">
          <Pagination
            title={count + " " + (type === "Music" ? type : type + "s")}
            count={count}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <div className="my-2 flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:gap-9 lg:pl-36 2xl:pl-44 3xl:pl-56">
            <span>Average</span> <span>Rated</span> <span>Wants</span>
          </div>
          {media.length > 0 ? (
            <ul>
              {media.map((media, index) => (
                <li key={index}>
                  <MediaItem media={media} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyContent />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
