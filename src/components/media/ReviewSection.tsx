import { Media, Review } from "../../utils/type";
import React, { useCallback, useEffect, useState } from "react";
import { ReviewDisplay } from "../common/ReviewDisplay";
import { Pagination } from "../common/Pagination";
import {
  getMediaReviewCount,
  getMediaReviews,
} from "../../apiUtils/reviewApiUtil.ts";
import { EmptyContent } from "../common/EmptyContent.tsx";
import { useAuthStore } from "../../contexts/AuthStore.ts";

export function ReviewSection({
  media,
  render,
  setRender,
}: {
  media: Media;
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const setMessage = useAuthStore((state) => state.setMessage);
  const fetchReviewsCount = useCallback(async () => {
    try {
      const fetchedCount = await getMediaReviewCount(media.id);
      setCount(fetchedCount);
    } catch (error) {
      setMessage("Error fetching reviews count");
    }
  }, [media.id, setMessage]);
  const fetchReviews = useCallback(async () => {
    try {
      const fetchedReviews = await getMediaReviews(media.id, currentPage);
      setReviews(fetchedReviews);
    } catch (e) {
      const error = e as Error;
      setMessage(error.message);
    }
  }, [currentPage, media.id, setMessage]);
  useEffect(() => {
    fetchReviewsCount().then();
  }, [fetchReviewsCount]);

  useEffect(() => {
    fetchReviews().then();
  }, [fetchReviews]);
  if (render) {
    fetchReviewsCount().then();
    fetchReviews().then();
    setRender(false);
  }

  return (
    <div className="mt-4 flex flex-col pb-4">
      <Pagination
        title={`${count} Reviews`}
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index} className="mb-4 border-b pb-2">
              <ReviewDisplay review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyContent />
      )}
    </div>
  );
}
