import { useParams } from "react-router-dom";
import { PageHeader } from "../layouts/PageHeader";
import { NotFound } from "../components/NotFound";
import { ReactNode, useEffect, useState } from "react";
import { getMedia } from "../apiService";
import { Media } from "../type";
import { MyImage } from "../components/Image";
import { MediaInfo } from "../components/MediaInfo";
import { ChevronDown, ChevronUp, Star, StarHalf } from "lucide-react";

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
            <Rating media={media} />
            <div className="lg:hidden">
              <AdditionalInfo media={media} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Rating({ media }: { media: Media }) {
  const [stars, setStars] = useState<ReactNode[]>();
  const [showDropDown, setShowDropDown] = useState(false);
  const [score, setScore] = useState<number | string>("");

  const renderStars = (score: number) => {
    const stars = Math.floor(score);
    const hasHalfStar = score % 1 !== 0;
    const starElements = [];

    for (let i = 0; i < stars; i++) {
      starElements.push(
        <Star
          key={`full-star-${i}`}
          color="rgb(234 179 8)"
          fill="rgb(234 179 8)"
        />
      );
    }

    if (hasHalfStar) {
      starElements.push(
        <StarHalf
          key="half-star"
          color="rgb(234 179 8)"
          fill="rgb(234 179 8)"
        />
      );
    }

    return starElements;
  };
  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MyScore = parseFloat(event.target.value);
    setScore(MyScore);
    setStars(renderStars(MyScore as number));
  };

  return (
    <div className="mt-4 lg:ml-8 relative pb-4 border-b-2">
      <p className="font-bold text-2xl">Rating/Catalog</p>
      <div className="flex !lg:flex-col">
        <div className="border flex justify-center items-center rounded-sm pl-2 pr-4 py-2 mt-4 w-48 h-10">
          <div className="relative">
            <div className="flex gap-1">
              {Array.from({ length: 5 }, () => (
                <Star
                  fill="rgb(209 213 219)"
                  strokeWidth={2}
                  strokeOpacity={0.5}
                />
              ))}
            </div>
            <div className="flex gap-1 top-0 absolute">{stars}</div>
          </div>
          <button
            onClick={() => {
              setShowDropDown(!showDropDown);
            }}
          >
            {!showDropDown ? (
              <ChevronDown size={32} className="mt-1" />
            ) : (
              <ChevronUp size={32} className="mb-1" />
            )}
          </button>
        </div>
        <div>
          <button
            className="h-10 mt-4 lg:ml-2 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors"
          >
            Set{" "}
            {media.type === "Music"
              ? "Listing"
              : media.type === "Movie"
              ? "Watching"
              : "Reading"}
          </button>
          <button
            className=" h-10 mt-4 ml-2 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors"
          >
            On Wishlist
          </button>
          <button
            className=" h-10 mt-4 ml-2 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors"
          >
            Review
          </button>
        </div>
      </div>
      {showDropDown && (
        <div className="absolute top-18 w-48 h-6 border rounded-md flex justify-center bg-gray-200 items-center">
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={score as number}
            onChange={handleScoreChange}
            className=" w-40 h-1 bg-Neutral-Mild appearance-none"
          />
        </div>
      )}
    </div>
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
