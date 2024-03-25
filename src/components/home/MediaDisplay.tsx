import { Media } from "../../utils/type";
import { MyImage } from "../common/MyImage";
import { MediaInfo } from "../common/MediaInfo";

export function MediaDisplay({ media }: { media: Media }) {
  return (
    <div className="flex !md:flex-col !md:items-start items-center">
      <div className="max-w-[50%]">
        <MyImage
          src={media.imageUrl}
          alt={media.title}
          href={`/media/${media.id}`}
        />
      </div>
      <div className="flex flex-1 flex-col items-start justify-center md:ml-8 lg:text-xl !md:mt-2">
        <MediaInfo media={media} home={true} />
      </div>
    </div>
  );
}
