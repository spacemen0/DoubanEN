import { useEffect, useState } from "react";
import { Media, Review } from "../../utils/type";
import { useAuthContext } from "../../contexts/AuthContext";
import { Pagination } from "../common/Pagination.tsx";
import {
  getReviewsByTypeAndUserIdWithPagination,
  getUserReviewsCountByMediaType,
} from "../../apiUtils/reviewApiUtil.ts";
import { EmptyContent } from "../common/EmptyContent.tsx";
import { ReviewDisplay } from "../common/ReviewDisplay.tsx";
import { getMedia } from "../../apiUtils/mediaApiUtil.ts";
import { MediaOptionSelect } from "./MediaOptionSelect.tsx";

export function Reviews({ id, username }: { id: number; username: string }) {
  const [selectedOption, setSelectedOption] = useState<
    "Music" | "Movie" | "Book"
  >("Music");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { setMessage } = useAuthContext();

  const handleOptionClick = async (option: "Music" | "Movie" | "Book") => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);
        setCount(await getUserReviewsCountByMediaType(id, selectedOption));
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
    };
    fetchCount().then();
  }, [id, selectedOption, setMessage]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setLoading(true);
        const reviews = await getReviewsByTypeAndUserIdWithPagination(
          id,
          selectedOption,
          currentPage,
        );
        setLoading(false);
        setReviews(reviews);
      } catch (error) {
        setMessage(`Error fetching Music Collection items`);
      }
    };

    fetchRatings().then();
  }, [currentPage, id, selectedOption, setMessage]);

  useEffect(() => {
    const fetchMedia = async () => {
      if (reviews)
        reviews.map(async (review) => {
          const media = await getMedia(review.mediaId);
          setMedia((prevState) => [...prevState, media]);
        });
    };
    fetchMedia().then();
  }, [reviews]);

  return (
    <div className="flex flex-col border-t-2 bg-gray-100 p-2 text-Neutral-Mild md:p-4 lg:p-6">
      <h2 className="mb-3 text-3xl font-semibold text-Neutral-Mild">
        {username}'s Reviews
      </h2>
      <div className="flex justify-start gap-10 text-2xl">
        <MediaOptionSelect
          selectedOption={selectedOption}
          handleOptionSelect={handleOptionClick}
        />
      </div>
      <Pagination
        title={count + " Reviews"}
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index} className="mb-4 border-b pb-2">
              <ReviewDisplay
                review={review}
                media={media.filter((media) => media.id === review.mediaId)[0]}
              />
            </li>
          ))}
        </ul>
      ) : (
        !loading && <EmptyContent />
      )}
    </div>
  );
}
