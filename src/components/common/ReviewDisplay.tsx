import { Star, StarHalf, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Media, Review } from "../../utils/type";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext.ts";
import {
  isReviewLiked,
  likeReview,
  unlikeReview,
} from "../../apiUtils/reviewApiUtil.ts";

export function ReviewDisplay({
  review,
  media,
}: {
  review: Review;
  media?: Media;
}) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const { user, setMessage, token } = useAuthContext();

  useEffect(() => {
    const checkLiked = async () => {
      try {
        if (user) setLiked(await isReviewLiked(review.id, user.id));
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
    };
    checkLiked().then();
  }, [review.id, setMessage, user]);
  const renderStars = () => {
    const stars = Math.floor(review.score);
    const hasHalfStar = review.score % 1 !== 0;
    const starElements = [];

    for (let i = 0; i < stars; i++) {
      starElements.push(
        <Star
          strokeWidth={0}
          size={26}
          key={`full-star-${i}`}
          color="rgb(234 179 8)"
          fill="rgb(234 179 8)"
        />,
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
        />,
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

  async function handleClickLikeButton() {
    if (user && token) {
      try {
        if (!liked) {
          setLiked(true);
          review.likes += 1;
          await likeReview(review.id, user.id, token);
        } else {
          setLiked(false);
          review.likes > 0 && (review.likes -= 1);
          await unlikeReview(review.id, user.id, token);
        }
      } catch (e) {
        if (liked) {
          setLiked(false);
          review.likes > 0 && (review.likes -= 1);
        } else {
          setLiked(true);
          review.likes += 1;
        }
        const error = e as Error;
        setMessage(error.message);
      }
    } else {
      setMessage("Please log in");
    }
  }

  return (
    <div>
      <div className="mt-2 flex items-center justify-between rounded-md bg-gray-200 py-2 pr-2 pl-2 lg:pr-4">
        <p className="flex items-center justify-center text-xl">
          <Link
            to={
              review.userId
                ? `/profile/${review.userId}`
                : `/media/${review.mediaId}`
            }
            className="font-bold"
          >
            {review.username}
          </Link>
          <button
            className="ml-2 py-0.5 md:ml-6"
            onClick={handleClickLikeButton}
          >
            <ThumbsUp
              fill={liked ? "rgb(234 179 8)" : "rgb(0, 0, 0, 0)"}
              color={"rgb(234 179 8)"}
            />
          </button>
        </p>

        <div className="flex items-center">
          <div className="relative">
            <div className="flex gap-0.5 text-Neutral-Mild lg:gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  fill="rgb(209 213 219)"
                  strokeWidth={0}
                  size={26}
                />
              ))}
            </div>
            <div className="absolute top-0 flex gap-0.5 lg:gap-1">
              {renderStars()}
            </div>
          </div>
        </div>
      </div>
      <div className="pl-2">
        <p className="mt-2 text-2xl font-semibold">{review.title}</p>
        {media && (
          <p className="mt-2 text-lg font-semibold text-Neutral-Mild">
            Reviewed for:{" "}
            <Link to={`/medias/${media.id}`}>
              <span className="text-2xl hover:text-Neutral">{media.title}</span>
            </Link>
          </p>
        )}
        <p className="mt-2 text-lg font-semibold text-Neutral-Mild">
          {" "}
          Reviewed on: {review.date},{" "}
          <span className="text-xl text-Neutral">{review.likes}</span> Likes
        </p>
        <p className="mt-2 lg:text-xl">
          {truncateContent(review.content, 400)}
        </p>
        {review.content.length > 400 && (
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
