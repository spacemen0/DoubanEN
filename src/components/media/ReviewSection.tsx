import {Media, Review} from "../../utils/type.ts";
import {useEffect, useState} from "react";
import {getMediaReviewCount, getMediaReviews} from "../../utils/apiService.ts";
import {ReviewDisplay} from "../home/ReviewDisplay.tsx";
import {useAuthContext} from "../../contexts/AuthContext.ts";

export function ReviewSection({media}: { media: Media }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [jumpTo, setJumpTo] = useState(1)
    const {setMessage} = useAuthContext()
    const pagination = 10
    useEffect(() => {
        const fetchReviewsCount = async (id: number) => {
            try {
                const fetchedCount = await getMediaReviewCount(id);
                setCount(fetchedCount)
            } catch (error) {
                setMessage("Error fetching reviews count")
            }
        }
        fetchReviewsCount(media.id).then()
    }, [media.id, setMessage]);

    useEffect(() => {
        const fetchReviews = async (page: number) => {
            try {
                const fetchedReviews = await getMediaReviews(media.id, page);
                setReviews(fetchedReviews);
            } catch (error) {
                setMessage("Error fetching reviews")
            }
        };
        fetchReviews(currentPage).then();
    }, [currentPage, media.id, setMessage]);


    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const renderPageButtons = () => {
        let totalPages = Math.floor(count / pagination);
        totalPages += count % pagination === 0 ? 0 : 1;
        const MaximumShown = 5;

        // Calculate the start page to ensure the current page is centered
        let startPage = currentPage - Math.floor(MaximumShown / 2);
        startPage = Math.max(startPage, 1);
        startPage = Math.min(startPage, Math.abs(totalPages - MaximumShown) + 1);
        let endPage = startPage + MaximumShown - 1
        endPage = Math.min(endPage, totalPages)

        const pagesToShow = [];
        for (let i = startPage; i <= endPage; i++) {
            pagesToShow.push(i);
        }

        return pagesToShow.map((page) => (
            <button
                className={`hover:bg-gray-300 py-1 rounded-md px-4 ${currentPage === page && "bg-gray-300"}`}
                key={page} onClick={() => handlePageClick(page)}>
                {page}
            </button>
        ));
    };

    return (
        <div className="mt-4 pb-4 flex flex-col">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-Neutral-Strong py-2 text-2xl">{count} Reviews</p>
                <div className="flex justify-center items-center align-middle py-2 text-lg">
                    <input
                        id="jump"
                        className="border rounded-md border-gray-300 mx-2 p-1 text-Neutral text-center font-semibold align-middle w-16 focus:outline-0"
                        type="text"
                        value={jumpTo}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value) setJumpTo(value)
                        }}
                    />
                    <button className="bg-Neutral-Mild hover:bg-Neutral text-white font-semibold p-1 rounded-md"
                            onClick={() => {
                                if (jumpTo > count / pagination) {
                                    setMessage("Exceed maximum page number")
                                    setJumpTo(1)
                                }
                                setCurrentPage(jumpTo)
                            }}>Jump
                    </button>
                </div>

            </div>

            <div className="flex justify-end items-center bg-gray-200 rounded-md text-lg font-semibold text-Neutral">
                <span className="text-xl font-semibold pr-3">Page:</span>


                {renderPageButtons()}

            </div>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index} className="mb-4 border-b pb-2"><ReviewDisplay review={review}/></li>
                ))}
            </ul>

        </div>
    );
}