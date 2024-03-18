import {Link, useParams} from "react-router-dom";
import {PageHeader} from "../components/common/PageHeader";
import {useEffect, useState} from "react";
import {ListInfo, Media} from "../utils/type.ts";
import {useAuthContext} from "../contexts/AuthContext.ts";
import {Pagination} from "../components/common/Pagination.tsx";
import {ListItem} from "../components/common/ListItem.tsx";
import {getAllListItems, getListInfo, getListItemsCount} from "../utils/apiService.ts";

export default function List() {
    const {id} = useParams();
    const [medias, setMedias] = useState<Media[]>()
    const [listInfo, setListInfo] = useState<ListInfo>()
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const {setMessage} = useAuthContext()
    useEffect(() => {
        const fetchListCount = async (id: number) => {
            try {
                const fetchedCount = await getListItemsCount(id);
                setCount(fetchedCount)
            } catch (error) {
                setMessage("Error fetching reviews count")
            }
        }
        fetchListCount(parseInt(id!)).then()
    }, [id, setMessage]);

    useEffect(() => {
        const fetchAllListItems = async () => {
            setMedias(await getAllListItems(parseInt(id!), currentPage))
        }
        fetchAllListItems().then()
    }, [currentPage, id]);

    useEffect(() => {
        const fetchListInfo = async () => {
            setListInfo(await getListInfo(parseInt(id!)))
        }
        fetchListInfo().then()
    }, [currentPage, id]);
    return (
        <div className="flex max-h-screen flex-col overflow-hidden">
            <PageHeader/>

            <div className="text-Neutral overflow-y-scroll px-2 lg:px-4">

                <p className="text-3xl font-bold my-4   text-Neutral">{listInfo?.title}</p>
                <span className=" text-Neutral text-2xl">Created by: <Link
                    className="text-Neutral-Strong font-semibold pb-1 border-b-2 border-Neutral-Strong"
                    to={`/profile/${listInfo?.userId}`}>{listInfo?.username}</Link></span>
                <p className="text-xl my-4 ">{listInfo?.description}</p>
                <Pagination title={`${count} List Items`} count={count} currentPage={currentPage}
                            setCurrentPage={setCurrentPage}/>
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
