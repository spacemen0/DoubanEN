import {useParams} from "react-router-dom";
import {PageHeader} from "../components/common/PageHeader";
import {NotFound} from "../components/common/NotFound";
import {useEffect, useState} from "react";
import {Media, MediaType} from "../utils/type";
import {ListItem} from "../components/common/ListItem";
import {useAuthContext} from "../contexts/AuthContext";
import {Pagination} from "../components/common/Pagination";
import {getAllMediasByType, getAllMediasCountByType,} from "../utils/services/mediaService";
import {EmptyMedias} from "../components/common/EmptyMedias";


export default function Medias() {
  const {type} = useParams();
  const [medias, setMedias] = useState<Media[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const {setMessage} = useAuthContext();
  useEffect(() => {
    const fetchReviewsCount = async (type: "Music" | "Movie" | "Book") => {
      try {
        const fetchedCount = await getAllMediasCountByType(type);
        setCount(fetchedCount);
      } catch (error) {
        setMessage(`Error fetching total number of ${type}s`);
      }
    };
    console.log(type!.charAt(0).toUpperCase() + type!.slice(1));
    fetchReviewsCount(
      (type!.charAt(0).toUpperCase() + type!.slice(1)) as MediaType,
    ).then();
  }, [setMessage, type]);

  useEffect(() => {
    const fetchAllMedias = async () => {
      setMedias(
        await getAllMediasByType(
          (type!.charAt(0).toUpperCase() + type!.slice(1)) as MediaType,
          currentPage,
        ),
      );
    };
    fetchAllMedias().then();
  }, [currentPage, type]);
  if (!["music", "movie", "book"].includes(type!)) {
    return <NotFound/>;
  }

  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader/>
      <div className="mt-2 overflow-y-scroll px-2 lg:px-4">
        <Pagination
          title={`${count} ${
            (type!.charAt(0).toUpperCase() + type!.slice(1)) as MediaType
          }s`}
          count={count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <div
          className="my-2 flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:gap-9 lg:pl-36 2xl:pl-44 3xl:pl-56">
          <span>Average</span> <span>Rated</span> <span>Wants</span>
        </div>
        {medias.length > 0 ? (
          medias.map((media, index) => {
            return <ListItem media={media} key={index}/>;
          })
        ) : (
          <EmptyMedias/>
        )}
      </div>
    </div>
  );
}
