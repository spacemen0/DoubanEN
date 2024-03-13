import { Link } from "react-router-dom";
import { Media } from "../type";
import { MyImage } from "./Image";

export function ListItem({ media }: { media: Media }) {
  return (
    <div className="flex w-full">
      <div className="w-full mr-2 md:mr-4 lg:mr-6 h-full max-w-32 max-h-32 mt-2">
        <MyImage
          src={media.image}
          alt={media.title}
          href={`/${media.type}/${media.id}`}
        />
      </div>
      <div className="flex-col flex justify-between w-full border-b border-gray-200 pb-1 align-top">
        <Link
          to={`/media/${media.type.toLowerCase()}/${media.id}`}
          className={
            " text-xl font-bold " +
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
          to={`/media/${media.type.toLowerCase()}/${media.id}`}
          className={
            "text-xl " +
            (media.type === "Music"
              ? "text-Music"
              : media.type === "Movie"
              ? "text-Movie"
              : "text-Book")
          }
        >
          {media.author}
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
        <div className="flex justify-between">
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

        <div className="flex justify-between items-center text-xl 3xl:pl-28 3xl:pr-4 xl:pr-2 2xl:pl-10 pl-0">
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
            {media.average}
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
      </div>
    </div>
  );
}
