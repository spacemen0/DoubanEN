import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { useParams } from "react-router-dom";
import { MediaItem } from "../components/common/MediaItem.tsx";
import { EmptyContent } from "../components/common/EmptyContent.tsx";
import { Pagination } from "../components/common/Pagination.tsx";
import { NotFound } from "../components/common/NotFound.tsx";
import {
  getAllMediaCountFromAuthor,
  getAllMediaFromAuthor,
  getAuthor,
} from "../apiUtils/authorApiUtil.ts";
import { useEffect, useState } from "react";
import { Author, Media } from "../utils/type.ts";
import Loading from "../components/common/Loading.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { useAuthStore } from "../contexts/AuthStore.ts";

export default function AuthorPage() {
  const { id } = useParams();
  const [author, setAuthor] = useState<Author>();
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const setMessage = useAuthStore((state) => state.setMessage);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (id)
        try {
          setLoading(true);
          const fetchedAuthor = await getAuthor(parseInt(id)); // Assuming id is a string, so we need to parse it to int
          setAuthor(fetchedAuthor);
        } catch (error) {
          console.error("Error fetching author:", error);
        }
    };
    fetchAuthor().then();
  }, [id]);

  useEffect(() => {
    const fetchMediaCount = async () => {
      if (id)
        try {
          setLoading(true);
          const fetchedCount = await getAllMediaCountFromAuthor(parseInt(id));
          setCount(fetchedCount);
        } catch (e) {
          const error = e as Error;
          setMessage(error.message);
        }
    };
    fetchMediaCount().then();
  }, [id, setMessage]);

  useEffect(() => {
    const fetchAllMedia = async () => {
      setLoading(true);
      if (id)
        try {
          const fetchedMedia = await getAllMediaFromAuthor(
            parseInt(id),
            currentPage
          );
          setMedia(fetchedMedia);
          setLoading(false);
        } catch (e) {
          const error = e as Error;
          setMessage(error.message);
          setMedia([]);
          setLoading(false);
        }
    };
    fetchAllMedia().then();
  }, [id, currentPage, setMessage]);

  if (loading) {
    return <Loading />;
  }
  if (!author || !id) {
    return <NotFound />;
  }
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="mt-2 overflow-y-scroll px-2 lg:px-4 flex flex-col justify-between h-screen">
        <Pagination
          title={
            count +
            " " +
            (author.type === "Artist"
              ? "Music"
              : author.type === "Director"
              ? "Movies"
              : "Books") +
            " by " +
            author.name
          }
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
        <Footer />
      </div>
    </div>
  );
}
