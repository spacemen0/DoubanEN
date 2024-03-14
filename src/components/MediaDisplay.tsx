import { Media } from "../type";
import { MyImage } from "./Image";
import { MediaInfo } from "./MediaInfo";

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
      <div className="md:ml-8 flex-1 flex flex-col items-start justify-center lg:text-xl ">
        <MediaInfo media={media} home={true} />
      </div>
    </div>
  );
}
