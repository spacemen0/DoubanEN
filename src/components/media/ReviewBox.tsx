import React, {ReactNode, useEffect, useState} from "react";
import {Media} from "../../utils/type.ts";
import {useAuthContext} from "../../contexts/AuthContext.ts";
import {fetchMyRating, postReview, submitRating} from "../../utils/apiService.ts";
import Draggable from "react-draggable";
import {ChevronDown, ChevronUp, Star, StarHalf} from "lucide-react";

export function Rating({media}: { media: Media }) {
    const [stars, setStars] = useState<ReactNode[]>();
    const [showDropDown, setShowDropDown] = useState(false);
    const [showReviewBox, setShowReviewBox] = useState(false);
    const [score, setScore] = useState<number>(0);
    const [rated, setRated] = useState<Date>();
    const {isLoggedIn, user, setMessage} = useAuthContext();
    const renderStars = (score: number) => {
        const stars = Math.floor(score);
        const hasHalfStar = score % 1 !== 0;
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
    useEffect(() => {
        const fetchRating = async () => {
            try {
                const MyRating = await fetchMyRating(user!.Id, media.id);
                console.log("MyStar: ", MyRating);
                setScore(MyRating.star);
                setStars(renderStars(MyRating.star as number));
                setRated(new Date(MyRating.reviewDate));
            } catch (error) {
                setMessage("Error fetch your previous rating");
            }
        };
        if (isLoggedIn) fetchRating().then(() => {
        });
    }, [isLoggedIn, media.id, setMessage, user]);
    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const MyScore = parseFloat(event.target.value);
        setScore(MyScore);
        setStars(renderStars(MyScore as number));
    };

    return (
        <div className="mt-4 lg:ml-8 pb-4 border-b-2">
            {showReviewBox && (
                <ReviewBox
                    setShowReviewBox={setShowReviewBox}
                    media={media}
                    score={score}
                />
            )}
            <div className="flex !md:flex-col justify-center items-start md:justify-start md:items-center">
                <p className="font-bold text-2xl">Rating/Catalog</p>
                {rated && (
                    <div className="md:pl-2 text-xl">
                        Rated at: {rated.toISOString().split("T")[0]}
                    </div>
                )}
            </div>

            <div className="flex !lg:flex-col lg:justify-start lg:items-center items-start">
                <div className="border flex justify-center items-center rounded-sm lg:pl-2 pr-2 py-2 mt-4">
                    <div className="relative ">
                        <div className="flex gap-1 h-[28px]">
                            {Array.from({length: 5}, (_, index) => (
                                <Star
                                    key={index}
                                    fill="rgb(209 213 219)"
                                    strokeWidth={0}
                                    size={28}
                                />
                            ))}
                        </div>
                        <div className="flex gap-1 top-0 absolute">{stars}</div>
                    </div>
                    <button
                        className="relative"
                        onClick={() => {
                            setShowDropDown(!showDropDown);
                        }}
                    >
                        {!showDropDown ? (
                            <ChevronDown size={32} className=""/>
                        ) : (
                            <ChevronUp size={32} className=""/>
                        )}
                        {showDropDown && (
                            <div
                                className="absolute top-10 right-0 w-48 h-6 border rounded-md flex justify-center bg-gray-200 items-center">
                                <input
                                    type="range"
                                    min="0.5"
                                    max="5"
                                    step="0.5"
                                    value={score as number}
                                    onChange={handleScoreChange}
                                    className="w-40 h-1 bg-Neutral-Mild appearance-none"
                                />
                            </div>
                        )}
                    </button>
                </div>
                <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2">
                    <button
                        onClick={() => {
                            if (user) {
                                try {
                                    const star = score as
                                        | 2
                                        | 1
                                        | 0.5
                                        | 1.5
                                        | 2.5
                                        | 3
                                        | 3.5
                                        | 4
                                        | 4.5
                                        | 5;
                                    const newDate = new Date(Date.now());
                                    const newRating = {
                                        userId: user.Id,
                                        username: user.name,
                                        star: star,
                                        reviewDate: newDate.toISOString().split("T")[0],
                                        mediaId: media.id,
                                        title: "",
                                        content: "",
                                    };
                                    submitRating(newRating).then();
                                    setRated(newDate);
                                    setMessage("Rating submitted");
                                } catch (error) {
                                    setMessage("Error processing Submit Rating request");
                                }
                            } else {
                                setMessage("Please log in to take action");
                            }
                        }}
                        className="  mt-4 lg:ml-2 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors"
                    >
                        Submit Rating
                    </button>
                    <button
                        className=" md:mt-4 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors"
                        onClick={() => {
                            if (user) {
                                try {
                                    const star = score as
                                        | 2
                                        | 1
                                        | 0.5
                                        | 1.5
                                        | 2.5
                                        | 3
                                        | 3.5
                                        | 4
                                        | 4.5
                                        | 5;
                                    submitRating({
                                        userId: user.Id,
                                        username: user.name,
                                        star: star,
                                        reviewDate: new Date(Date.now())
                                            .toISOString()
                                            .split("T")[0],
                                        mediaId: media.id,
                                        title: "",
                                        content: "",
                                    }).then();
                                } catch (error) {
                                    setMessage(
                                        `Error processing Set ${
                                            media.type === "Music"
                                                ? "Listing"
                                                : media.type === "Movie"
                                                    ? "Watching"
                                                    : "Reading"
                                        }request`
                                    );
                                }
                            } else {
                                setMessage("Please log in to take action");
                            }
                        }}
                    >
                        Set{" "}
                        {media.type === "Music"
                            ? "Listing"
                            : media.type === "Movie"
                                ? "Watching"
                                : "Reading"}
                    </button>

                    <button
                        className="  lg:mt-4 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors"
                        onClick={() => {
                            if (user) {
                                try {
                                    const star = score as
                                        | 2
                                        | 1
                                        | 0.5
                                        | 1.5
                                        | 2.5
                                        | 3
                                        | 3.5
                                        | 4
                                        | 4.5
                                        | 5;
                                    submitRating({
                                        userId: user.Id,
                                        username: user.name,
                                        star: star,
                                        reviewDate: new Date(Date.now())
                                            .toISOString()
                                            .split("T")[0],
                                        mediaId: media.id,
                                        title: "",
                                        content: "",
                                    }).then();
                                } catch (error) {
                                    setMessage("Error processing Set On Wishlist request");
                                }
                            } else {
                                setMessage("Please log in to take action");
                            }
                        }}
                    >
                        On Wishlist
                    </button>
                    <button
                        className="  lg:mt-4 bg-Neutral-Mild text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none
         focus:bg-Neutral focus:ring-1 focus:ring-Neutral transition-colors"
                        onClick={() => {
                            if (isLoggedIn) setShowReviewBox(!showReviewBox);
                            else setMessage("Please log in to take action");
                        }}
                    >
                        Review
                    </button>
                </div>
            </div>
        </div>
    );
}

export function AdditionalInfo({media}: { media: Media }) {
    if (!media.tracks && !media.chapters && !media.casts) return <></>;

    return (
        <>
            <p className="font-bold text-2xl my-4">
                {media.type === "Music"
                    ? "Track Listing"
                    : media.type === "Book"
                        ? "Chapter Listing"
                        : "Cast"}
            </p>
            <div className="flex flex-col rounded-md border text-xl">
                {media.type === "Music" && media.tracks && (
                    <>
                        {media.tracks.map((item, index) => (
                            <p
                                key={index}
                                className={`border-b py-2 ${index % 2 === 0 && "bg-gray-100"}`}
                            >
                                <span className="font-semibold px-4">{index + 1}</span> {item}
                            </p>
                        ))}
                    </>
                )}
                {media.type === "Book" && media.chapters && (
                    <>
                        {media.chapters.map((item, index) => (
                            <p
                                key={index}
                                className={`border-b py-2 ${index % 2 === 0 && "bg-gray-100"}`}
                            >
                                <span className="font-semibold px-4">{index + 1}</span> {item}
                            </p>
                        ))}
                    </>
                )}
                {media.type === "Movie" && media.casts && (
                    <>
                        {media.casts.map((item, index) => (
                            <div
                                key={index}
                                className={`border-b py-2 ${index % 2 === 0 && "bg-gray-100"}`}
                            >
                                <p className="font-semibold px-4">{item.character}</p>
                                <p className="px-4">{item.actor}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}

function ReviewBox({
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

export function ReviewSection({media}: { media: Media }) {
    return <div className="">{media.id}</div>;
}