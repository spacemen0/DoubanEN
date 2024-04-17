import { PageHeader } from "../components/common/PageHeader";
import { MediaItem } from "../components/common/MediaItem.tsx";
import { EmptyContent } from "../components/common/EmptyContent.tsx";
import { Link, useLocation } from "react-router-dom";
import { Media } from "../utils/type.ts";

export default function Result() {
  const location = useLocation();
  const { medias } = location.state as {
    medias: Media[];
  };

  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="mt-2 overflow-y-scroll px-2 lg:px-4">
        <h2 className="font-bold text-Neutral text-3xl mx-2 mt-4 ">
          {medias.length + " Results"}
        </h2>

        <div className="flex items-center justify-end rounded-md bg-gray-200 text-lg font-semibold text-Neutral my-2">
          <div className="flex items-center font-semibold text-Neutral-Mild justify-center my-0.5 text-2xl">
            <p className="  lg:mr-4 !md:mx-2">
              Didn't find what are you looking at?
            </p>
            <Link
              className="mb-1 mr-2 text-Neutral-Strong hover:text-Neutral-Mild border-b-2 border-Neutral-Strong hover:border-Neutral-Mild"
              to="/add-media"
            >
              Add media
            </Link>
          </div>
        </div>
        <div className="my-2 flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:gap-9 lg:pl-36 2xl:pl-44 3xl:pl-56">
          <span>Average</span> <span>Rated</span> <span>Wants</span>
        </div>
        {medias.length > 0 ? (
          <ul>
            {medias.map((media, index) => (
              <li key={index}>
                <MediaItem media={media} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyContent />
        )}
      </div>
    </div>
  );
}
