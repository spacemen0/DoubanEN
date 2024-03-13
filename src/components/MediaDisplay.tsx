import { Link } from "react-router-dom";
import { Media } from "../type";
import { MyImage } from "./Image";

export function MediaDisplay({ media }: { media: Media }) {
  return (
    <div className="flex !md:flex-col !md:items-start items-center">
      <div className="max-w-[50%]">
        <MyImage
          src={media.image}
          alt={media.title}
          href={`/media/${media.type}/${media.id}`}
        />
      </div>
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
