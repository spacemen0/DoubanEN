import {Media} from "../../utils/type.ts";
import React, {ReactNode, useEffect, useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext.ts";
import {ChevronDown, ChevronUp, Star, StarHalf} from "lucide-react";
import {fetchMyRating, submitRating} from "../../utils/apiService.ts";
import {NewReviewBox} from "./NewReviewBox.tsx";

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
        <div className="mt-4 border-b-2 pb-4">
            {showReviewBox && (
                <NewReviewBox
                    setShowReviewBox={setShowReviewBox}
                    media={media}
                    score={score}
                />
            )}
            <div className="flex !md:flex-col justify-center items-start md:justify-start md:items-center">
                <p className="text-2xl font-bold">Rating/Catalog</p>
                {rated && (
                    <div className="text-xl md:pl-2">
                        Rated at: {rated.toISOString().split("T")[0]}
                    </div>
                )}
            </div>

            <div className="flex !lg:flex-col lg:justify-start lg:items-center items-start">
                <div className="mt-4 flex items-center justify-center rounded-sm border py-2 pr-2 lg:pl-2">
                    <div className="relative">
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
                        <div className="absolute top-0 flex gap-1">{stars}</div>
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
                                className="absolute top-10 right-0 flex h-6 w-48 items-center justify-center rounded-md border bg-gray-200">
                                <input
                                    type="range"
                                    min="0.5"
                                    max="5"
                                    step="0.5"
                                    value={score as number}
                                    onChange={handleScoreChange}
                                    className="h-1 w-40 appearance-none bg-Neutral-Mild"
                                />
                            </div>
                        )}
                    </button>
                </div>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
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