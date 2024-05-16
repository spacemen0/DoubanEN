import { Media } from "../../utils/type";
import { FullImage } from "../common/FullImage.tsx";
import { MediaInfo } from "../common/MediaInfo";
import { apiUrl } from "../../utils/config.ts";

export function MediaDisplay({ media }: { media: Media }) {
  return (
    <div className="flex !md:flex-col !md:items-start items-center">
      <div className="max-w-[50%]">
        <FullImage src={apiUrl + media.imageUrl} alt={media.title} />
      </div>
      <div className="flex flex-1 flex-col items-start justify-center md:ml-8 lg:text-xl !md:mt-2">
        <MediaInfo media={media} home={true} />
      </div>
    </div>
  );
}
