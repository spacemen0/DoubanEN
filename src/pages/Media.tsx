import {useParams} from "react-router-dom";
import {PageHeader} from "../components/common/PageHeader";
import {NotFound} from "../components/common/NotFound";
import {useEffect, useState} from "react";
import {getMedia,} from "../utils/apiService.ts";
import {Media} from "../utils/type.ts";
import {MyImage} from "../components/common/MyImage";
import {MediaInfo} from "../components/common/MediaInfo";
import {useAuthContext} from "../contexts/AuthContext";
import {AdditionalInfo} from "../components/media/AdditionalInfo.tsx";
import {Rating} from "../components/media/Rating.tsx";
import {ReviewSection} from "../components/media/ReviewSection.tsx";

export default function MediaPage() {
    const {setMessage} = useAuthContext();
    const {type, id} = useParams();
    const [media, setMedia] = useState<Media>();
    useEffect(() => {
        const FetchMedia = async () => {
            try {
                const media = await getMedia(
                    parseInt(id!),
                    (type!.charAt(0).toUpperCase() + type!.slice(1)) as
                        | "Music"
                        | "Movie"
                        | "Book"
                );
                setMedia(media);
            } catch (error) {
                setMessage("Error fetch Media information");
            }
        };
        FetchMedia().then();
    }, [id, setMessage, type]);
    if (!["music", "movie", "book"].includes(type!)) {
        return <NotFound/>;
    }
    return (
        <>
            <PageHeader/>
            {media && (
                <div className="flex !lg:flex-col items-center lg:items-start justify-center ml-10 mr-10 mt-6 ">
                    <div className="flex w-full flex-1 flex-col lg:flex-[0.3]">
                        <MyImage src={media.image} alt={media.title} href={media.image}/>
                        <div className="hidden lg:block">
                            <AdditionalInfo media={media}/>
                        </div>
                    </div>
                    <div
                        className="mb-4 flex w-full flex-1 flex-col border-gray-300 pt-2 text-Neutral lg:flex-[0.7] lg:ml-6 lg:border-t lg:border-l lg:pl-2">
                        <MediaInfo media={media} home={false}/>
                        <Rating media={media}/>
                        <div className="lg:hidden">
                            <AdditionalInfo media={media}/>
                        </div>
                        <ReviewSection media={media}/>
                    </div>
                </div>
            )}
        </>
    );
}

