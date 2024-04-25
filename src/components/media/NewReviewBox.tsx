import React, { useRef, useState } from "react";
import { Media, RatingScore, Review } from "../../utils/type";
import { useAuthContext } from "../../contexts/AuthContext";
import Draggable from "react-draggable";
import { postReview } from "../../apiUtils/reviewApiUtil.ts";

export function NewReviewBox({
  setShowReviewBox,
  media,
  score,
  onSuccessAndRender,
}: {
  setShowReviewBox: (value: React.SetStateAction<boolean>) => void;
  media: Media;
  score: number;
  onSuccessAndRender: () => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user, setMessage, token } = useAuthContext();
  const reviewBox = useRef(null);

  const handleReset = () => {
    setTitle("");
    setContent("");
  };

  const handlePostReview = async () => {
    if (score === 0) {
      setMessage("Please rate before posting a review");
      return;
    }
    const review: Review = {
      id: 0,
      likes: 0,
      mediaType: media.type,
      username: user!.username,
      userId: user!.id,
      mediaId: media.id,
      date: new Date(Date.now()).toISOString().split("T")[0],
      score: score as RatingScore,
      title: title,
      content: content,
    };
    try {
      await postReview(review, media.type, token!);
      await onSuccessAndRender();
      setShowReviewBox(false);
    } catch (error) {
      setMessage("Error processing Post Review request");
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <Draggable cancel=".need-interaction" nodeRef={reviewBox}>
        <div
          id="message"
          className="w-72 rounded-lg border-2 bg-white text-center border-Neutral-Mild md:w-96 lg:w-[480px]"
          ref={reviewBox}
        >
          <label
            htmlFor="message"
            className="block rounded-t-lg border-b-2 bg-gray-100 px-4 py-2 text-xl font-semibold text-Neutral-Strong border-Neutral-Mild"
          >
            Your Review
          </label>
          <textarea
            rows={1}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border-b-2 bg-white font-semibold need-interaction p-2.5 text-Neutral-Strong border-Neutral-Mild focus:ring-Neutral-Mild focus:outline-none"
            placeholder="Title"
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          ></textarea>
          <textarea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="hidden w-full bg-white need-interaction p-2.5 text-Neutral focus:outline-none lg:block"
            placeholder="Write your review here..."
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          ></textarea>
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-white need-interaction p-2.5 text-Neutral focus:outline-none lg:hidden"
            placeholder="Write your review here..."
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          ></textarea>
          <div className="flex w-full justify-end rounded-br-lg border-t-2 need-interaction border-Neutral-Mild">
            <button
              className="w-1/8 bg-gray-100 px-2 border-l-2 py-1 hover:bg-Neutral-Mild  border-Neutral-Mild
         focus:ring-1 focus:ring-Neutral transition-colors hover:text-white"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="w-1/8 bg-gray-100 px-2 border-l-2 py-1 hover:bg-Neutral-Mild  border-Neutral-Mild
         focus:ring-1 focus:ring-Neutral transition-colors hover:text-white"
              onClick={handlePostReview}
            >
              Post
            </button>
            <button
              className="w-1/8 bg-gray-100 px-2 border-l-2 py-1 hover:bg-Neutral-Mild  border-Neutral-Mild
         focus:ring-1 focus:ring-Neutral transition-colors rounded-br-md hover:text-white"
              onClick={() => {
                setShowReviewBox(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
