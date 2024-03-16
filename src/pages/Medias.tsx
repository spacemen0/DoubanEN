import {useParams} from "react-router-dom";
import {PageHeader} from "../components/common/PageHeader";
import {NotFound} from "../components/common/NotFound";
import {useEffect, useState} from "react";
import {getAllMedias} from "../utils/apiService.ts";
import {Media} from "../utils/type.ts";
import {ListItem} from "../components/common/ListItem.tsx";

export default function Medias() {
    const {type} = useParams();
    const [medias,setMedias] = useState<Media[]>()
    useEffect(() => {
        const fetchAllMedias = async () => {
            setMedias( await getAllMedias((type!.charAt(0).toUpperCase() + type!.slice(1)) as
                | "Music"
                | "Movie"
                | "Book", 1))
        }
        fetchAllMedias().then()
    }, [type]);
    if (!["music", "movie", "book"].includes(type!)) {
        return <NotFound/>;
    }

    return (
        <>
            <PageHeader/>
            {medias?.map(
                (media,index)=>{
                    return <ListItem media={media} key={index} />
                }
            )}
        </>
    );
}
