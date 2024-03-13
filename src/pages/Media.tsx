import { Link, useParams } from "react-router-dom";
import { PageHeader } from "../layouts/PageHeader";
import { NotFound } from "../components/NotFound";
import { useEffect, useState } from "react";
import { getMedia } from "../apiService";
import { Media } from "../type";

export default function MediaPage() {
  const { type, id } = useParams();
  const [media, setMedia] = useState<Media>();
  useEffect(() => {
    const FetchMedia = async () => {
      try {
        const media = await getMedia(
          parseInt(id!),
          type as "Music" | "Movie" | "Book"
        );
        setMedia(media);
      } catch (error) {
        console.error(`Error fetching Media:`, error);
      }
    };
    FetchMedia();
  }, [id, type]);
  if (!["music", "movie", "book"].includes(type!)) {
    return <NotFound />;
  }
  return (
    <>
      <PageHeader />
      {media && (
        <div className="flex items-center justify-center mx-auto w-3/5">
          <MediaPageMediaDisplay media={media} />
        </div>
      )}
    </>
  );
}

function MediaPageMediaDisplay({ media }: { media: Media }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="md:ml-8 flex-1 flex flex-col items-center !md:items-start justify-center lg:text-xl">
        <Link
          to={`/media/${media.type.toLowerCase()}/${media.id}`}
          className="text-xl lg:text-2xl font-semibold mt-2"
        >
          {media.title}
        </Link>
        <p className="mt-2">
          <span className="font-semibold">Type:&nbsp;</span> {media.type}
        </p>
        <p className="mt-2">
          <span className="font-semibold">
            {media.type === "Music"
              ? "Artist"
              : media.type === "Book"
              ? "Author"
              : "Director"}
            :&nbsp;
          </span>{" "}
          {media.author}
        </p>
        <p className="mt-2">
          <span className="font-semibold">Genre:&nbsp;</span> {media.genre}
        </p>
        <p className="mt-2">
          <span className="text-xl lg:text-2xl font-semibold">
            {media.average}&nbsp;
          </span>
          from{" "}
          <span className="text-xl lg:text-2xl font-semibold">
            {" "}
            {media.ratings}&nbsp;
          </span>
          ratings
        </p>
        <p className="mt-2 text-xl lg:text-2xl font-semibold">
          {media.wants + " "}wants
        </p>
      </div>
    </div>
  );
}
