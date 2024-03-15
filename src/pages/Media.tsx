import { useParams } from "react-router-dom";
import { PageHeader } from "../layouts/PageHeader";
import { NotFound } from "../components/NotFound";
import { ReactNode, useEffect, useState } from "react";
import { fetchMyRating, getMedia, submitRating } from "../apiService";
import { Media } from "../type";
import { MyImage } from "../components/Image";
import { MediaInfo } from "../components/MediaInfo";
import { ChevronDown, ChevronUp, Star, StarHalf } from "lucide-react";
import { useAuthContext } from "../contexts/AuthContext";

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
  const [score, setScore] = useState<number>(0);
  const [rated, setRated] = useState<Date>();
  const { isLoggedIn, user, setMessage } = useAuthContext();
  const renderStars = (score: number) => {
    const stars = Math.floor(score);
    const hasHalfStar = score % 1 !== 0;
    const starElements = [];

    for (let i = 0; i < stars; i++) {
      starElements.push(
        <Star
          strokeWidth={0}
          size={28}
          key={`full-star-${i}`}
          color="rgb(234 179 8)"
          fill="rgb(234 179 8)"
        />
      );
    }

    if (hasHalfStar) {
      starElements.push(
        <StarHalf
          strokeWidth={0}
          size={28}
          key="half-star"
          color="rgb(234 179 8)"
          fill="rgb(234 179 8)"
        />
      );
    }

    return starElements;
  };
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const MyRating = await fetchMyRating(user!.Id, media.id);
        console.log("MyStar: ", MyRating);
        setScore(MyRating.star);
        setStars(renderStars(MyRating.star as number));
        setRated(new Date(MyRating.reviewDate));
      } catch (error) {
        console.log(error);
      }
    };
    if (isLoggedIn) fetchRating();
  }, [isLoggedIn, media.id, user]);
  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MyScore = parseFloat(event.target.value);
    setScore(MyScore);
    setStars(renderStars(MyScore as number));
  };

  return (
    <div className="mt-4 lg:ml-8 pb-4 border-b-2">
      <div className="flex !md:flex-col justify-center items-start md:justify-start md:items-center">
        <p className="font-bold text-2xl">Rating/Catalog</p>
        {rated && (
          <div className="md:pl-2 text-xl">
            Rated at: {rated.toISOString().split("T")[0]}
          </div>
        )}
      </div>

      <div className="flex !lg:flex-col lg:justify-start lg:items-center items-start">
        <div className="border flex justify-center items-center rounded-sm lg:pl-2 pr-2 py-2 mt-4">
          <div className="relative ">
            <div className="flex gap-1 h-[28px]">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  fill="rgb(209 213 219)"
                  strokeWidth={0}
                  size={28}
                />
              ))}
            </div>
            <div className="flex gap-1 top-0 absolute">{stars}</div>
          </div>
          <button
            className="relative"
            onClick={() => {
              setShowDropDown(!showDropDown);
            }}
          >
            {!showDropDown ? (
              <ChevronDown size={32} className="" />
            ) : (
              <ChevronUp size={32} className="" />
            )}
            {showDropDown && (
              <div className="absolute top-10 right-0 w-48 h-6 border rounded-md flex justify-center bg-gray-200 items-center">
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={score as number}
                  onChange={handleScoreChange}
                  className="w-40 h-1 bg-Neutral-Mild appearance-none"
                />
              </div>
            )}
          </button>
        </div>
        <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2">
          <button
            onClick={() => {
              if (user) {
                try {
                  const star = score as
                    | 2
                    | 1
                    | 0.5
                    | 1.5
                    | 2.5
                    | 3
                    | 3.5
                    | 4
                    | 4.5
                    | 5;
                  submitRating({
                    userId: user.Id,
                    username: user.name,
                    star: star,
                    reviewDate: new Date(Date.now())
                      .toISOString()
                      .split("T")[0],
                    mediaId: media.id,
                    content: "",
                  });
                } catch (error) {
                  console.log(error);
                }
              } else {
                setMessage("Please log in before submitting a rating");
              }
            }}
            className="  mt-4 lg:ml-2 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors"
          >
            Submit Rating
          </button>
          <button
            className=" md:mt-4 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
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
            className="  lg:mt-4 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors"
          >
            On Wishlist
          </button>
          <button
            className="  lg:mt-4 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors"
          >
            Review
          </button>
        </div>
      </div>
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
