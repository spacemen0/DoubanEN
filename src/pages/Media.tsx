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
          (type!.charAt(0).toUpperCase() + type!.slice(1)) as
            | "Music"
            | "Movie"
            | "Book"
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
    <div className="flex justify-center items-center">
      <MediaInfo media={media} />
    </div>
  );
}

function MediaInfo({ media }: { media: Media }) {
  return (
    <div className="md:ml-8 flex-1 flex flex-col items-center !md:items-start justify-center lg:text-xl">
      <Link
        to={`/media/${media.type.toLowerCase()}/${media.id}`}
        className="text-xl lg:text-2xl font-semibold mt-2"
      >
        {media.title}
      </Link>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="font-semibold pr-4 pb-2">Type:</td>
            <td>{media.type}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4 pb-2">Released Date:</td>
            <td>{media.releaseDate}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4 pb-2">
              {media.type === "Music"
                ? "Artist"
                : media.type === "Book"
                ? "Author"
                : "Director"}
              :
            </td>
            <td>{media.author}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4 pb-2">Genre:</td>
            <td>{media.genre}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4 pb-2">Ratings:</td>
            <td>
              <span className="text-xl lg:text-2xl font-semibold">
                {media.average}&nbsp;
              </span>
              from&nbsp;
              <span className="text-xl lg:text-2xl font-semibold">
                {media.ratings}&nbsp;
              </span>
              ratings
            </td>
          </tr>
          <tr>
            <td className="font-semibold pr-4 pb-2">Wants:</td>
            <td>
              <span className="text-xl lg:text-2xl font-semibold">
                {media.wants}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
