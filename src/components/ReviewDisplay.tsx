import { Star, StarHalf } from "lucide-react";
import { useState } from "react";
import { Review } from "../type";

export function ReviewDisplay({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const renderStars = () => {
    const stars = Math.floor(review.star);
    const hasHalfStar = review.star % 1 !== 0;
    const starElements = [];

    for (let i = 0; i < stars; i++) {
      starElements.push(
        <Star
          strokeWidth={0}
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
    <>
      <p className="mt-2 lg:text-xl">
        <span className="font-semibold"> Reviewed by: </span>{" "}
        <a href="/#" className="font-bold ">
          {review.username}
        </a>
      </p>
      <p className="mt-2 lg:text-xl">
        <span className="font-semibold">Review Date: </span>
        {review.reviewDate}
      </p>
      <div className="flex items-center lg:text-xl mt-2">
        <p className="font-semibold">Rating:&nbsp;</p>
        <div className="relative">
          <div className="flex gap-1 text-Neutral-Mild">
            {Array.from({ length: 5 }, (_, index) => (
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
      <p className="mt-2 lg:text-xl">{truncateContent(review.content, 200)}</p>
      {review.content.length > 200 && (
        <button
          onClick={toggleExpand}
          className=" font-extrabold rounded-md mt-1 lg:font-bold"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </>
  );
}
