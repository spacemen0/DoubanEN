import {Media, Review} from "../../utils/type";
import {useEffect, useState} from "react";
import {ReviewDisplay} from "../common/ReviewDisplay";
import {useAuthContext} from "../../contexts/AuthContext";
import {Pagination} from "../common/Pagination";
import {getMediaReviewCount, getMediaReviews,} from "../../utils/services/reviewService";


export function ReviewSection({media}: { media: Media }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const {setMessage} = useAuthContext();
  useEffect(() => {
    const fetchReviewsCount = async (id: number) => {
      try {
        const fetchedCount = await getMediaReviewCount(id);
        setCount(fetchedCount);
      } catch (error) {
        setMessage("Error fetching reviews count");
      }
    };
    fetchReviewsCount(media.id).then();
  }, [media.id, setMessage]);

  useEffect(() => {
    const fetchReviews = async (page: number) => {
      try {
        const fetchedReviews = await getMediaReviews(media.id, page);
        setReviews(fetchedReviews);
      } catch (error) {
        setMessage("Error fetching reviews");
      }
    };
    fetchReviews(currentPage).then();
  }, [currentPage, media.id, setMessage]);

  return (
    <div className="mt-4 flex flex-col pb-4">
      <Pagination
        title={`${count} Reviews`}
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {reviews.length >= 0 && (
        <ul>
          {reviews.map((review, index) => (
            <li key={index} className="mb-4 border-b pb-2">
              <ReviewDisplay review={review}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
