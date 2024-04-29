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

export default function AuthorPage() {
  const { id } = useParams();
  const [author, setAuthor] = useState<Author>();
  const [medias, setMedias] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (id)
        try {
          const fetchedAuthor = await getAuthor(parseInt(id)); // Assuming id is a string, so we need to parse it to int
          setAuthor(fetchedAuthor);
        } catch (error) {
          console.error("Error fetching author:", error);
        }
    };
    fetchAuthor().then();
  }, [id]);

  useEffect(() => {
    const fetchMediasCount = async () => {
      if (id)
        try {
          const fetchedCount = await getAllMediaCountFromAuthor(parseInt(id));
          setCount(fetchedCount);
        } catch (error) {
          console.error("Error fetching total number of medias:", error);
        }
    };
    fetchMediasCount().then();
  }, [id]);

  useEffect(() => {
    const fetchAllMedias = async () => {
      setLoading(true);
      if (id)
        try {
          const fetchedMedias = await getAllMediaFromAuthor(
            parseInt(id),
            currentPage,
          );
          setMedias(fetchedMedias);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching medias:", error);
          setMedias([]);
          setLoading(false);
        }
    };
    fetchAllMedias().then();
  }, [id, currentPage]);

  if (loading) {
    return <Loading />;
  }
  if (!author || !id) {
    return <NotFound />;
  }
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="mt-2 overflow-y-scroll px-2 lg:px-4">
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
