import { useParams } from "react-router-dom";
import { PageHeader } from "../layouts/PageHeader";
import { NotFound } from "../components/NotFound";
import { useEffect, useState } from "react";
import { getMedia } from "../apiService";
import { Media } from "../type";
import { MyImage } from "../components/Image";
import { MediaInfo } from "../components/MediaInfo";

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
              <AdditionalInfo media={media} />
            </div>
          </div>
          <div className="flex-1 lg:flex-[0.7] w-full mt-2 flex flex-col mb-4 text-Neutral border-Neutral-Mild">
            <MediaInfo media={media} home={false} />
            <div className="lg:hidden">
              <AdditionalInfo media={media} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AdditionalInfo({ media }: { media: Media }) {
  if (!media.tracks && !media.chapters && !media.casts) return <></>;

  return (
    <>
      <p className="font-bold text-2xl my-4">
        {media.type === "Music"
          ? "Track Listing"
          : media.type === "Book"
          ? "Chapter Listing"
          : "Cast"}
      </p>
      <div className="flex flex-col rounded-md border text-xl">
        {media.type === "Music" && media.tracks && (
          <>
            {media.tracks.map((item, index) => (
              <p
                key={index}
                className={`border-b py-2 ${index % 2 === 0 && "bg-gray-100"}`}
              >
                <span className="font-semibold px-4">{index + 1}</span> {item}
              </p>
            ))}
          </>
        )}
        {media.type === "Book" && media.chapters && (
          <>
            {media.chapters.map((item, index) => (
              <p
                key={index}
                className={`border-b py-2 ${index % 2 === 0 && "bg-gray-100"}`}
              >
                <span className="font-semibold px-4">{index + 1}</span> {item}
              </p>
            ))}
          </>
        )}
        {media.type === "Movie" && media.casts && (
          <>
            {media.casts.map((item, index) => (
              <div
                key={index}
                className={`border-b py-2 ${index % 2 === 0 && "bg-gray-100"}`}
              >
                <p className="font-semibold px-4">{item.character}</p>
                <p className="px-4">{item.actor}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
