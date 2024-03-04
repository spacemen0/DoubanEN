import { Star, StarHalf } from "lucide-react";
import { Image } from "./Image";
import { useState } from "react";

export function FeaturedItem({ image, music, review }: { image: ImageProps; music: MusicProps; review: ReviewProps }) {
    const [expanded, setExpanded] = useState(false);

    const renderStars = () => {
        const stars = Math.floor(review.star);
        const hasHalfStar = review.star % 1 !== 0;
        const starElements = [];

        for (let i = 0; i < stars; i++) {
            starElements.push(<Star key={`full-star-${i}`} color="rgb(234 179 8)" fill="rgb(234 179 8)" />);
        }

        if (hasHalfStar) {
            starElements.push(<StarHalf key="half-star" color="rgb(234 179 8)" fill="rgb(234 179 8)" />);
        }

        return starElements;
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const truncateContent = (content: string, maxLength: number) => {
        if (expanded) {
            return content;
        }
        return content.length > maxLength ? `${content.slice(0, maxLength)}...` : content;
    };

    return (
        <div className="mx-auto bg-white rounded-md shadow-md p-4 text-gray-600">
            <div className="flex !md:flex-col !md:items-start items-center">
                <div className="max-w-[50%]">
                    <Image {...image} />
                </div>
                <div className="md:ml-8 flex-1 flex flex-col items-center !md:items-start justify-center">
                    <h2 className="text-xl font-semibold mt-2">{music.title}</h2>
                    <p className="mt-2">
                        <span className="font-semibold">Artist:&nbsp;</span> {music.artist}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Genre:&nbsp;</span> {music.genre}
                    </p>
                    <div className="flex items-center mt-2">
                        <p className="font-semibold">Rating:&nbsp;</p>
                        <div className="flex">{renderStars()}</div>
                    </div>
                    <p className="mt-2">
                        <span className="text-xl font-semibold">{music.average}&nbsp;</span>
                        from <span className="text-xl font-semibold"> {music.ratings}&nbsp;</span>ratings
                    </p>
                </div>
            </div>

            <p className="mt-2">
                <span className="font-semibold"> Reviewed by: </span>{" "}
                <a href="/#" className="font-bold text-sky-900">
                    {review.username}
                </a>
            </p>
            <p className="mt-2">
                <span className="font-semibold">Review Date: </span>
                {review.reviewDate}
            </p>
            <p className="mt-2">{truncateContent(review.content, 800)}</p>
            {review.content.length > 800 && (
                <button
                    onClick={toggleExpand}
                    className="text-sky-600 font-bold rounded-md mt-2 "
                >
                    {expanded ? "Show Less" : "Show More"}
                </button>
            )}
        </div>
    );
}