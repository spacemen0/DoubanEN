import { Media } from "../type";
import { Image } from "./Image";

export function ListItem({ media }: { media: Media }) {
  return (
    <div className="flex w-full">
      <div className="w-full mr-2 md:mr-4 lg:mr-6 h-full max-w-32 max-h-32 mt-2">
        <Image
          src={media.image}
          alt={media.title}
          href={`/${media.type}/${media.id}`}
        />
      </div>
      <div className="flex-col flex justify-between w-full border-b border-gray-200 pb-1 align-top">
        <a href="/#" className="text-sky-700 text-xl">
          {media.title}
        </a>
        <a href="/#" className="text-sky-800 text-xl font-bold">
          {media.author}
        </a>
        <p className="text-xl">{media.releaseDate}</p>
        <div className="flex justify-between">
          <p className="text-xl">{media.type}</p>
          <p className="text-xl">{media.genre}</p>
        </div>

        <div className="flex justify-between items-center text-xl 3xl:pl-28 3xl:pr-4 xl:pr-2 2xl:pl-10 pl-0">
          <p className="text-sky-600 text-2xl">{media.average}</p>
          <p>{media.ratings}</p>
          <p>{media.wants}</p>
        </div>
      </div>
    </div>
  );
}
