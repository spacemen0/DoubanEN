import { Media, MediaStatus, Score } from "../../utils/type";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { ChevronDown, ChevronUp, Star, StarHalf } from "lucide-react";
import { NewReviewBox } from "./NewReviewBox";
import { deleteReview } from "../../utils/services/reviewService";
import {
  cancelDoing,
  cancelWishlist,
  deleteRating,
  getMediaStatus,
  setDoing,
  setWishlist,
  submitRating,
} from "../../utils/services/mediaStatusService";
import { ListBox } from "./ListBox";

export function MediaOperationSection({
  media,
  onSuccess,
  onSuccessAndRender,
}: {
  media: Media;
  onSuccess: () => Promise<void>;
  onSuccessAndRender: () => Promise<void>;
}) {
  const [stars, setStars] = useState<ReactNode[]>();
  const [showDropDown, setShowDropDown] = useState(false);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [showListBox, setShowListBox] = useState(false);
  const [mediaStatus, setMediaStatus] = useState<MediaStatus>({
    status: "None",
    score: 0,
  });
  const { isLoggedIn, user, setMessage } = useAuthContext();

  useEffect(() => {
    const stars = Math.floor(mediaStatus.score);
    const hasHalfStar = mediaStatus.score % 1 !== 0;
    const starElements = [];

    for (let i = 0; i < stars; i++) {
      starElements.push(
        <Star
          strokeWidth={0}
          size={28}
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
          size={28}
          key="half-star"
          color="rgb(234 179 8)"
          fill="rgb(234 179 8)"
        />,
      );
    }
    setStars(starElements);
  }, [mediaStatus]);
  const fetchStatus = useCallback(async () => {
    try {
      const status = await getMediaStatus(user!.id, media.id);
      console.log("MyStatus: ", status);
      setMediaStatus({
        id: status.id,
        score: status.score,
        status: status.status,
        date: status.date,
      });
    } catch (error) {
      setMessage("Error fetch your previous status");
    }
  }, [media.id, setMessage, user]);
  useEffect(() => {
    if (isLoggedIn) fetchStatus().then();
  }, [fetchStatus, isLoggedIn]);

  const handleSuccess = async () => {
    await fetchStatus();
    await onSuccess();
  };
  const handleOnSuccessAndRender = async () => {
    await fetchStatus();
    await onSuccessAndRender();
  };

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MyScore = parseFloat(event.target.value);
    setMediaStatus({ ...mediaStatus, score: MyScore });
  };

  return (
    <div className="mt-4 border-t-2 border-b-2 py-4">
      {showReviewBox && (
        <NewReviewBox
          setShowReviewBox={setShowReviewBox}
          media={media}
          score={mediaStatus.score}
          onSuccessAndRender={handleOnSuccessAndRender}
        />
      )}
      {showListBox && <ListBox setShowListBox={setShowListBox} media={media} />}
      <div className="flex !md:flex-col justify-center items-start md:justify-start md:items-center">
        <p className="text-2xl font-bold">Rating/Catalog</p>

        {mediaStatus.status === "Rated" && (
          <div className="text-xl md:pl-4">
            <span>Rated at: {mediaStatus.date}</span>
          </div>
        )}
        {mediaStatus.status === "Reviewed" && (
          <div className="text-xl md:pl-4">
            <span>Reviewed at: {mediaStatus.date}</span>
          </div>
        )}
        {mediaStatus.status === "Wishlist" && (
          <div className="text-xl md:pl-4">
            <span>Added to wishlist at: {mediaStatus.date}</span>
          </div>
        )}
        {mediaStatus.status === "Doing" && (
          <div className="text-xl md:pl-4">
            <span>
              Set{" "}
              {media.type === "Music"
                ? "listening"
                : media.type === "Movie"
                  ? "watching"
                  : "reading"}{" "}
              at: {mediaStatus.date}
            </span>
          </div>
        )}
      </div>
      <button
        className="md:pl-4 mt-4 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors"
        onClick={() => {
          if (user) {
            setShowListBox(!showListBox);
          } else setMessage("Please log in to take action");
        }}
      >
        Add to list
      </button>

      <div className="flex !lg:flex-col lg:justify-start lg:items-center items-start">
        <div className="mt-4 flex items-center justify-center rounded-sm border py-2 pr-2 lg:pl-2">
          <div className="relative">
            <div className="flex gap-1 h-[28px]">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  fill="rgb(209 213 219)"
                  strokeWidth={0}
                  size={28}
                />
              ))}
            </div>
            <div className="absolute top-0 flex gap-1">{stars}</div>
          </div>
          <button
            className="relative"
            onClick={() => {
              setShowDropDown(!showDropDown);
            }}
          >
            {!showDropDown ? (
              <ChevronDown size={32} className="" />
            ) : (
              <ChevronUp size={32} className="" />
            )}
            {showDropDown && (
              <div className="absolute top-10 right-0 flex h-6 w-48 items-center justify-center rounded-md border bg-gray-200">
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={mediaStatus.score as number}
                  onChange={handleScoreChange}
                  className="h-1 w-40 appearance-none bg-Neutral-Mild"
                />
              </div>
            )}
          </button>
        </div>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={async () => {
              if (user) {
                try {
                  if (mediaStatus.status === "Rated") {
                    await deleteRating(mediaStatus.id!);
                    setMessage("Rating deleted");
                    await handleSuccess();
                  } else {
                    if (mediaStatus.score !== 0) {
                      const score = mediaStatus.score as Score;
                      // const newDate = new Date(Date.now());
                      await submitRating(user.id, score, media.id, media.type);

                      // setMediaStatus({
                      //   ...mediaStatus,
                      //   score: score,
                      //   status: "Rated",
                      //   date: newDate.toISOString().split("T")[0],
                      // });
                      setMessage("Rating submitted");
                      await handleSuccess();
                    } else setMessage("Please rate before submitting");
                  }
                } catch (error) {
                  setMessage("Error processing Submit Rating request");
                }
              } else {
                setMessage("Please log in to take action");
              }
            }}
            className={`mt-4 lg:ml-2 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors ${mediaStatus.status === "Rated" ? "bg-Neutral-Strong" : "bg-Neutral-Mild"}`}
          >
            {mediaStatus.status === "Rated" ? "Delete" : "Submit"} Rating
          </button>
          <button
            className={`md:mt-4 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors ${mediaStatus.status === "Doing" ? "bg-Neutral-Strong" : "bg-Neutral-Mild"}`}
            onClick={async () => {
              if (user) {
                try {
                  if (mediaStatus.status === "Doing") {
                    await cancelDoing(mediaStatus.id!);
                    setMessage(
                      `${
                        media.type === "Music"
                          ? "Listing"
                          : media.type === "Movie"
                            ? "Watching"
                            : "Reading"
                      } status canceled`,
                    );
                    await handleSuccess();
                    // setMediaStatus({
                    //   ...mediaStatus,
                    //   score: 0,
                    //   status: "None",
                    // });
                  } else {
                    await setDoing(user.id, media.id, media.type);
                    setMessage(
                      `Set ${
                        media.type === "Music"
                          ? "listing"
                          : media.type === "Movie"
                            ? "watching"
                            : "reading"
                      } status successfully`,
                    );
                    await handleSuccess();
                    // setMediaStatus({
                    //   ...mediaStatus,
                    //   score: 0,
                    //   status: "Doing",
                    //   date: new Date(Date.now()).toISOString().split("T")[0],
                    // });
                  }
                } catch (error) {
                  setMessage(
                    `Error processing Set ${
                      media.type === "Music"
                        ? "Listing"
                        : media.type === "Movie"
                          ? "Watching"
                          : "Reading"
                    }request`,
                  );
                }
              } else {
                setMessage("Please log in to take action");
              }
            }}
          >
            {mediaStatus.status === "Doing" ? "Cancel " : "Set "}
            {media.type === "Music"
              ? "Listing"
              : media.type === "Movie"
                ? "Watching"
                : "Reading"}
          </button>

          <button
            className={`  lg:mt-4 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
                            focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors ${mediaStatus.status === "Wishlist" ? "bg-Neutral-Strong" : "bg-Neutral-Mild"}`}
            onClick={async () => {
              if (user) {
                try {
                  if (mediaStatus.status === "Wishlist") {
                    await cancelWishlist(mediaStatus.id!);
                    setMessage("Removed from wishlist");
                    await handleSuccess();
                    // setMediaStatus({
                    //   ...mediaStatus,
                    //   score: 0,
                    //   status: "None",
                    // });
                  } else {
                    await setWishlist(user.id, media.id, media.type);
                    setMessage("Added to wishlist");
                    // setMediaStatus({
                    //   ...mediaStatus,
                    //   score: 0,
                    //   status: "Wishlist",
                    //   date: new Date(Date.now()).toISOString().split("T")[0],
                    // });
                    await handleSuccess();
                  }
                } catch (error) {
                  setMessage("Error processing Set On Wishlist request");
                }
              } else {
                setMessage("Please log in to take action");
              }
            }}
          >
            {mediaStatus.status === "Wishlist" ? "Cancel" : "On"} Wishlist
          </button>
          <button
            className={`  lg:mt-4 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
                            focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors ${mediaStatus.status === "Reviewed" ? "bg-Neutral-Strong" : "bg-Neutral-Mild"}`}
            onClick={async () => {
              if (user) {
                try {
                  if (mediaStatus.status === "Reviewed") {
                    await deleteReview(user.id, media.id, mediaStatus.id!);
                    setMessage("Review deleted");
                    await handleOnSuccessAndRender();
                    // setMediaStatus({
                    //   ...mediaStatus,
                    //   score: 0,
                    //   status: "None",
                    // });
                  } else {
                    if (mediaStatus.score !== 0)
                      setShowReviewBox(!showReviewBox);
                    else setMessage("Please rate before posting a review");
                  }
                } catch (error) {
                  setMessage("Error processing Set On Wishlist request");
                }
              } else setMessage("Please log in to take action");
            }}
          >
            {mediaStatus.status === "Reviewed" ? "Delete" : "New"} Review
          </button>
        </div>
      </div>
    </div>
  );
}
