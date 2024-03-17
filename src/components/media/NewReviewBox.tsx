import React, {useState} from "react";
import {Media} from "../../utils/type.ts";
import {useAuthContext} from "../../contexts/AuthContext.ts";
import {postReview} from "../../utils/apiService.ts";
import Draggable from "react-draggable";

export function NewReviewBox({
                              setShowReviewBox,
                              media,
                              score,
                          }: {
    setShowReviewBox: (value: React.SetStateAction<boolean>) => void;
    media: Media;
    score: number;
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const {user, setMessage} = useAuthContext();

    const handleReset = () => {
        setTitle("");
        setContent("");
    };

    const handlePostReview = async () => {
        if (score === 0) {
            setMessage("Please rate before post a review");
            return;
        }
        const review = {
            username: user!.name,
            userId: user!.Id,
            mediaId: media.id,
            reviewDate: new Date(Date.now()).toISOString().split("T")[0],
            star: score as 2 | 1 | 0.5 | 1.5 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5,
            title: title,
            content: content,
        };
        try {
            await postReview(review);
            setShowReviewBox(false);
        } catch (error) {
            setMessage("Error processing Post Review request");
        }
    };

    return (
        <div className="z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Draggable cancel=".need-interaction">
                <div
                    id="message"
                    className="rounded-lg border-2 text-center lg:w-[480px] md:w-96 w-72 border-Neutral-Mild bg-white"
                >
                    <label
                        htmlFor="message"
                        className="block py-2 px-4 text-xl rounded-t-lg bg-gray-100 font-semibold text-Neutral-Strong border-b-2 border-Neutral-Mild"
                    >
                        Your Review
                    </label>
                    <textarea
                        rows={1}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="need-interaction block p-2.5 w-full focus:outline-none font-semibold text-Neutral-Strong border-b-2 border-Neutral-Mild focus:ring-Neutral-Mild bg-white"
                        placeholder="Title"
                        onMouseDown={(event) => {
                            event.stopPropagation();
                        }}
                    ></textarea>
                    <textarea
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="need-interaction hidden lg:block p-2.5 w-full focus:outline-none text-Neutral bg-white"
                        placeholder="Write your review here..."
                        onMouseDown={(event) => {
                            event.stopPropagation();
                        }}
                    ></textarea>
                    <textarea
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="need-interaction lg:hidden p-2.5 w-full focus:outline-none text-Neutral bg-white"
                        placeholder="Write your review here..."
                        onMouseDown={(event) => {
                            event.stopPropagation();
                        }}
                    ></textarea>
                    <div
                        className="need-interaction border-t-2 w-full flex justify-end border-Neutral-Mild rounded-br-lg">
                        <button
                            className="w-1/8 bg-gray-100 px-2 border-l-2 py-1 hover:bg-Neutral-Mild  border-Neutral-Mild
         focus:ring-1 focus:ring-Neutral transition-colors"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                        <button
                            className="w-1/8 bg-gray-100 px-2 border-l-2 py-1 hover:bg-Neutral-Mild  border-Neutral-Mild
          focus:ring-1 focus:ring-Neutral transition-colors rounded-br-lg"
                            onClick={handlePostReview}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </Draggable>
        </div>
    );
}

