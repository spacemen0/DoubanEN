import { Link, useParams } from "react-router-dom";
import { PageHeader } from "../layouts/PageHeader";
import { NotFound } from "../components/NotFound";
import { useEffect, useState } from "react";
import { getMedia } from "../apiService";
import { Media } from "../type";
import { MyImage } from "../components/Image";

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
        <div className="flex !lg:flex-col items-center lg:items-start justify-center ml-10 mr-10 mt-6 ">
          <div className="flex-1 lg:flex-[0.3] w-full flex flex-col ">
            <MyImage src={media.image} alt={media.title} href={media.image} />
            <div className="hidden lg:block">
              <TrackInfo media={media} />
            </div>
          </div>
          <div className="flex-1 lg:flex-[0.7] w-full mt-2 flex flex-col mb-4 text-Neutral">
            <MediaInfo media={media} />
            <div className="lg:hidden">
              <TrackInfo media={media} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MediaInfo({ media }: { media: Media }) {
  return (
    <div className="lg:ml-8 flex-1 flex flex-col items-center !md:items-start justify-center text-xl border-b-2 pb-3 border-Neutral-Mild">
      <div className="flex justify-between w-full pb-2 border-b-2 border-Neutral-Mild">
        <Link
          to={`/media/${media.type.toLowerCase()}/${media.id}`}
          className="text-4xl font-semibold "
        >
          {media.title}
        </Link>
        <span className="pt-2">{`[${media.type}${media.id}]`}</span>
      </div>
      <table className="w-full mt-3">
        <tbody>
          <tr>
            <td className="font-semibold pr-4 pb-3">Type:</td>
            <td>{media.type}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4 pb-3">Released Date:</td>
            <td>{media.releaseDate}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4 pb-3">
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
            <td className="font-semibold pr-4 pb-3">Genre:</td>
            <td>{media.genre}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4 pb-3">Ratings:</td>
            <td>
              <span className="text-xl lg:text-2xl font-semibold">
                {media.average}&nbsp;
              </span>
              <span className="text-lg pr-2">/5.0</span>
              from&nbsp;
              <span className="text-xl lg:text-2xl font-semibold">
                {media.ratings}&nbsp;
              </span>
              ratings
            </td>
          </tr>
          <tr>
            <td className="font-semibold pr-4">Wants:</td>
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

function TrackInfo({ media }: { media: Media }) {
  if (!media.tracks) return <></>;
  return (
    <>
      <p className="font-bold text-2xl my-4">Track Listing</p>
      <div className="flex flex-col rounded-md border text-xl">
        {media.tracks.map((item, index) => (
          <p
            key={index}
            className={`border-b py-2 ${index % 2 === 0 && "bg-gray-100"}`}
          >
            <span className="font-semibold px-4">{index}</span> {item}
          </p>
        ))}
      </div>
    </>
  );
}
