import { Star, StarHalf } from "lucide-react";
import { Image } from "./Image";
import { useState } from "react";
import { ImageProps, Media, Review } from "../type";
import { Link } from "react-router-dom";

export function FeaturedItem({
  image,
  media,
  review,
}: {
  image: ImageProps;
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
          ? "text-Movie"
          : "text-Book")
      }
    >
      <MediaDisplay image={image} media={media} />
      <ReviewDisplay review={review} />
    </div>
  );
}

export function MediaDisplay({
  image,
  media,
}: {
  image: ImageProps;
  media: Media;
}) {
  return (
    <div className="flex !md:flex-col !md:items-start items-center">
      <div className="max-w-[50%]">
        <Image {...image} />
      </div>
      <div className="md:ml-8 flex-1 flex flex-col items-center !md:items-start justify-center lg:text-xl">
        <Link
          to={`/${media.type}/${media.id}`}
          className="text-xl lg:text-2xl font-semibold mt-2"
        >
          {media.title}
        </Link>
        <p className="mt-2">
          <span className="font-semibold">Type:&nbsp;</span> {media.type}
        </p>
        <p className="mt-2">
          <span className="font-semibold">
            {media.type === "Music"
              ? "Artist"
              : media.type === "Book"
              ? "Author"
              : "Director"}
            :&nbsp;
          </span>{" "}
          {media.author}
        </p>
        <p className="mt-2">
          <span className="font-semibold">Genre:&nbsp;</span> {media.genre}
        </p>
        <p className="mt-2">
          <span className="text-xl lg:text-2xl font-semibold">
            {media.average}&nbsp;
          </span>
          from{" "}
          <span className="text-xl lg:text-2xl font-semibold">
            {" "}
            {media.ratings}&nbsp;
          </span>
          ratings
        </p>
      </div>
    </div>
  );
}

export function ReviewDisplay({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const renderStars = () => {
    const stars = Math.floor(review.star);
    const hasHalfStar = review.star % 1 !== 0;
    const starElements = [];

    for (let i = 0; i < stars; i++) {
      starElements.push(
        <Star
          key={`full-star-${i}`}
          color="rgb(234 179 8)"
          fill="rgb(234 179 8)"
        />
      );
    }

    if (hasHalfStar) {
      starElements.push(
        <StarHalf
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
        <div className="flex">{renderStars()}</div>
      </div>
      <p className="mt-2 lg:text-xl">{truncateContent(review.content, 200)}</p>
      {review.content.length > 200 && (
        <button onClick={toggleExpand} className=" font-bold rounded-md mt-2 ">
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </>
  );
}
