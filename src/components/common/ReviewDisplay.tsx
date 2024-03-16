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
                    size={28}
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
                    size={28}
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
            <div className="flex justify-between bg-gray-200 items-center pr-4 pl-2 py-2 rounded-md mt-2">
                <p className="lg:text-xl">
                    <Link to="/" className="font-bold ">
                        {review.username}
                    </Link>
                </p>
                <div className="flex items-center lg:text-xl">
                    <div className="relative">
                        <div className="flex gap-1 text-Neutral-Mild">
                            {Array.from({length: 5}, (_, index) => (
                                <Star
                                    key={index}
                                    fill="rgb(209 213 219)"
                                    strokeWidth={0}
                                    size={28}
                                />
                            ))}
                        </div>
                        <div className="flex gap-1 top-0 absolute">{renderStars()}</div>
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
                        className="font-semibold rounded-md mt-1 lg:font-bold"
                    >
                        {expanded ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>
        </div>
    );
}
