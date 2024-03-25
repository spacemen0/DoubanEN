import { Media, Review } from "../../utils/type";
import { MediaDisplay } from "./MediaDisplay";
import { ReviewDisplay } from "../common/ReviewDisplay";

export function FeaturedItem({
  media,
  review,
}: {
  media: Media;
  review: Review;
}) {
  return (
    <div
      className={
        "w-full bg-white rounded-md border shadow-md p-2 text-Neutral-Mild"
      }
    >
      <MediaDisplay media={media} />
      <ReviewDisplay review={review} />
    </div>
  );
}
