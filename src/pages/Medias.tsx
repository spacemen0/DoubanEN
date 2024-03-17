import {useParams} from "react-router-dom";
import {PageHeader} from "../components/common/PageHeader";
import {NotFound} from "../components/common/NotFound";
import {useEffect, useState} from "react";
import {getAllMedias, getAllMediasCount} from "../utils/apiService.ts";
import {Media, MediaType} from "../utils/type.ts";
import {ListItem} from "../components/common/ListItem.tsx";
import {useAuthContext} from "../contexts/AuthContext.ts";
import {Pagination} from "../components/common/Pagination.tsx";

export default function Medias() {
    const {type} = useParams();
    const [medias, setMedias] = useState<Media[]>()
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const {setMessage} = useAuthContext()
    useEffect(() => {
        const fetchReviewsCount = async (type: "Music"
            | "Movie"
            | "Book") => {
            try {
                const fetchedCount = await getAllMediasCount(type);
                setCount(fetchedCount)
            } catch (error) {
                setMessage("Error fetching reviews count")
            }
        }
        fetchReviewsCount((type!.charAt(0).toUpperCase() + type!.slice(1)) as
            MediaType).then()
    }, [setMessage, type]);

    useEffect(() => {
        const fetchAllMedias = async () => {
            setMedias(await getAllMedias((type!.charAt(0).toUpperCase() + type!.slice(1)) as
                MediaType, currentPage))
        }
        fetchAllMedias().then()
    }, [currentPage, type]);
    if (!["music", "movie", "book"].includes(type!)) {
        return <NotFound/>;
    }


    return (
        <div className="flex max-h-screen flex-col overflow-hidden">
            <PageHeader/>
            <div className="mt-2 overflow-y-scroll px-2 lg:px-4">
                <Pagination title={`${count} ${(type!.charAt(0).toUpperCase() + type!.slice(1)) as
                    MediaType}s`} count={count} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                <div
                    className="my-2 flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:gap-9 lg:pl-36 2xl:pl-44 3xl:pl-56">
                    <span>Average</span> <span>Rated</span> <span>Wants</span>
                </div>
                {medias?.map(
                    (media, index) => {
                        return <ListItem media={media} key={index}/>
                    }
                )}
            </div>
        </div>
    );
}
