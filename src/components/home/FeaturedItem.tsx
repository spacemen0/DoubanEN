import {Media, Review} from "../../utils/type.ts";
import {MediaDisplay} from "./MediaDisplay";
import {ReviewDisplay} from "../common/ReviewDisplay.tsx";

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
                "w-full bg-white rounded-md border shadow-md p-2 " +
                (media.type === "Music"
                    ? "text-Music"
                    : media.type === "Movie"
                        ? "text-Movie "
                        : "text-Book ")
            }
        >
            <MediaDisplay media={media}/>
            <ReviewDisplay review={review}/>
        </div>
    );
}