import {Star, StarHalf} from "lucide-react";
import {useState} from "react";
import {Review} from "../../utils/type.ts";
import {Link} from "react-router-dom";

export function ReviewDisplay({review}: { review: Review }) {
    const [expanded, setExpanded] = useState(false);
    const renderStars = () => {
        const stars = Math.floor(review.star);
        const hasHalfStar = review.star % 1 !== 0;
        const starElements = [];

        for (let i = 0; i < stars; i++) {
            starElements.push(
                <Star
                    strokeWidth={0}
                    size={26}
                    key={`full-star-${i}`}
                    color="rgb(234 179 8)"
                    fill="rgb(234 179 8)"
                />
            );
        }

        if (hasHalfStar) {
            starElements.push(
                <StarHalf
                    strokeWidth={0}
                    size={26}
                    key="half-star"
                    color="rgb(234 179 8)"
                    fill="rgb(234 179 8)"
                />
            );
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
        return content.length > maxLength
            ? `${content.slice(0, maxLength)}...`
            : content;
    };
    return (
        <div>
            <div className="mt-2 flex items-center justify-between rounded-md bg-gray-200 py-2 pr-2 pl-2 lg:pr-4">
                <p className="lg:text-xl">
                    <Link to="/" className="font-bold">
                        {review.username}
                    </Link>
                </p>
                <div className="flex items-center">
                    <div className="relative">
                        <div className="flex gap-0.5 text-Neutral-Mild lg:gap-1">
                            {Array.from({length: 5}, (_, index) => (
                                <Star
                                    key={index}
                                    fill="rgb(209 213 219)"
                                    strokeWidth={0}
                                    size={26}
                                />
                            ))}
                        </div>
                        <div className="absolute top-0 flex gap-0.5 lg:gap-1">{renderStars()}</div>
                    </div>
                </div>
            </div>
            <div className="pl-2">
                <p className="mt-2 text-lg">
                    {review.reviewDate}
                </p>
                <p className="mt-2 lg:text-xl">{truncateContent(review.content, 200)}</p>
                {review.content.length > 200 && (
                    <button
                        onClick={toggleExpand}
                        className="mt-1 rounded-md font-semibold lg:font-bold"
                    >
                        {expanded ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>
        </div>
    );
}
