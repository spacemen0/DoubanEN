import { useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { NotFound } from "../components/common/NotFound";
import { useEffect, useState } from "react";
import { Media, MediaType } from "../utils/type";
import { MediaItem } from "../components/common/MediaItem.tsx";
import { useAuthContext } from "../contexts/AuthContext";
import { Pagination } from "../components/common/Pagination";
import {
  getAllMediaByType,
  getAllMediaCountByType,
} from "../apiUtils/mediaApiUtil.ts";
import { EmptyContent } from "../components/common/EmptyContent.tsx";
import Loading from "../components/common/Loading.tsx";
import { Footer } from "../components/common/Footer.tsx";

export default function MediaByType() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [medias, setMedias] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { setMessage } = useAuthContext();
  useEffect(() => {
    setCurrentPage(1);
  }, [type]);
  useEffect(() => {
    const fetchMediasCount = async (type: MediaType) => {
      setLoading(true);
      try {
        const fetchedCount = await getAllMediaCountByType(type);
        setCount(fetchedCount);
      } catch (error) {
        setMessage(`Error fetching total number of ${type}s`);
      }
    };
    type && fetchMediasCount(type as MediaType).then();
  }, [setMessage, type]);

  useEffect(() => {
    const fetchAllMedias = async () => {
      setLoading(true);
      try {
        setMedias(await getAllMediaByType(type as MediaType, currentPage));
        setLoading(false);
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
    };
    type && fetchAllMedias().then();
  }, [currentPage, setMessage, type]);
  if (!type || !["Music", "Movie", "Book", "All"].includes(type)) {
    return <NotFound />;
  }
  if (loading) return <Loading />;

  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="mt-2 overflow-y-scroll px-2 lg:px-4">
        <Pagination
          title={count + " " + (type === "Music" ? type : type + "s")}
          count={count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <div className="my-2 flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:gap-9 lg:pl-36 2xl:pl-44 3xl:pl-56">
          <span>Average</span> <span>Rated</span> <span>Wants</span>
        </div>
        {medias.length > 0 ? (
          <ul>
            {medias.map((media, index) => (
              <li key={index}>
                <MediaItem media={media} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyContent />
        )}
        <Footer />
      </div>
    </div>
  );
}
