import { Link } from "react-router-dom";
import { Media, RatingScore } from "../../utils/type";
import { FullImage } from "./FullImage.tsx";
import { apiUrl } from "../../utils/config.ts";
import { Star, StarHalf } from "lucide-react";
import { JSX } from "react";

export function MediaItem({
  media,
  score,
  text,
  date,
  side = false,
}: {
  media: Media;
  score?: RatingScore;
  text?: string;
  date?: string;
  side?: boolean;
}) {
  const renderStars = () => {
    if (score) {
      const stars = Math.floor(score);
      const hasHalfStar = score % 1 !== 0;
      const starElements: JSX.Element[] = [];

      for (let i = 0; i < stars; i++) {
        starElements.push(
          <Star
            strokeWidth={0}
            size={28}
            key={`full-star-${i}`}
            color="rgb(234 179 8)"
            fill="rgb(234 179 8)"
          />,
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
          />,
        );
      }
      return starElements;
    }
  };
  return (
    <div className="flex w-full">
      <div
        className={`mt-2 mr-2 h-full  w-full overflow-clip  md:mr-4 lg:mr-6 flex-shrink-0 ${side ? "max-w-24 max-h-24" : "max-w-32 max-h-32"}`}
      >
        <Link to={apiUrl + media.imageUrl}>
          <FullImage src={apiUrl + media.imageUrl} alt={media.title} />
        </Link>
      </div>
      <div className="flex w-full flex-col justify-between border-b border-gray-200 pb-1 align-top">
        <Link
          to={`/media/${media.id}`}
          className={
            "text-xl font-bold mr-12 w-fit " +
            (media.type === "Music"
              ? "text-Music"
              : media.type === "Movie"
                ? "text-Movie"
                : "text-Book")
          }
        >
          {media.title}
        </Link>
        <Link
          to={`/author/${media.author}`}
          className={
            "text-xl mr-12 w-fit " +
            (media.type === "Music"
              ? "text-Music"
              : media.type === "Movie"
                ? "text-Movie"
                : "text-Book")
          }
        >
          {media.author_name}
        </Link>
        <p
          className={
            "text-xl " +
            (media.type === "Music"
              ? "text-Music"
              : media.type === "Movie"
                ? "text-Movie"
                : "text-Book")
          }
        >
          {media.releaseDate}
        </p>
        <div className="flex justify-between xl:pr-2 3xl:pr-4">
          <p
            className={
              "text-xl font-semibold " +
              (media.type === "Music"
                ? "text-Music"
                : media.type === "Movie"
                  ? "text-Movie"
                  : "text-Book")
            }
          >
            {media.type}
          </p>

          <p
            className={
              "text-xl " +
              (media.type === "Music"
                ? "text-Music"
                : media.type === "Movie"
                  ? "text-Movie"
                  : "text-Book")
            }
          >
            {media.genre}
          </p>
        </div>

        <div className="flex items-center justify-between pl-0 text-xl xl:pr-2 2xl:pl-10 3xl:pr-4 3xl:pl-28">
          <p
            className={
              "text-xl " +
              (media.type === "Music"
                ? "text-Music"
                : media.type === "Movie"
                  ? "text-Movie"
                  : "text-Book")
            }
          >
            {media.average.toFixed(2)}
          </p>
          <p
            className={
              media.type === "Music"
                ? "text-Music"
                : media.type === "Movie"
                  ? "text-Movie"
                  : "text-Book"
            }
          >
            {media.ratings}
          </p>
          <p
            className={
              media.type === "Music"
                ? "text-Music"
                : media.type === "Movie"
                  ? "text-Movie"
                  : "text-Book"
            }
          >
            {media.wants}
          </p>
        </div>
        {score && date && (
          <div className="flex !md:flex-col">
            <div
              className={`flex mt-2 justify-between lg:justify-start items-center text-xl font-semibold ${
                media.type === "Music"
                  ? "text-Music"
                  : media.type === "Movie"
                    ? "text-Movie"
                    : "text-Book"
              }`}
            >
              {text}&nbsp;
              <div className="flex">{renderStars()}</div>
            </div>
            <p
              className={`mt-2 md:ml-2 items-center text-xl font-semibold ${
                media.type === "Music"
                  ? "text-Music"
                  : media.type === "Movie"
                    ? "text-Movie"
                    : "text-Book"
              }`}
            >
              Rated on: {date}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
