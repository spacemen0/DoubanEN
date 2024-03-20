import {useParams} from "react-router-dom";
import {PageHeader} from "../components/common/PageHeader";
import {useEffect, useState} from "react";
import {getMedia,} from "../utils/apiService.ts";
import {Media} from "../utils/type.ts";
import {MyImage} from "../components/common/MyImage";
import {MediaInfo} from "../components/common/MediaInfo";
import {useAuthContext} from "../contexts/AuthContext";
import {AdditionalInfo} from "../components/media/AdditionalInfo.tsx";
import {Rating} from "../components/media/Rating.tsx";
import {ReviewSection} from "../components/media/ReviewSection.tsx";
import Loading from "../components/common/Loading.tsx";
import {NotFound} from "../components/common/NotFound.tsx";

export default function MediaPage() {
    const {setMessage} = useAuthContext();
    const {id} = useParams();
    const [media, setMedia] = useState<Media>();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const media = await getMedia(parseInt(id!));
                setMedia(media);
            } catch (error) {
                setMessage("Error fetching media information");
                setError((error as Error).message); // Set the error message state
            }
        };
        fetchMedia().then();
    }, [id, setMessage]);

    // Render NotFound component if specific error is caught
    if (error === 'Failed to fetch Media') {
        return <NotFound/>;
    }
    return (
        <>
            <PageHeader/>
            {media ? (
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
            ) : <Loading/>}
        </>
    );
}

