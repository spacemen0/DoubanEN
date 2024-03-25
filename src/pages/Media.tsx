import {useParams} from "react-router-dom";
import {PageHeader} from "../components/common/PageHeader";
import {useEffect, useState} from "react";
import {Media} from "../utils/type";
import {MyImage} from "../components/common/MyImage";
import {MediaInfo} from "../components/common/MediaInfo";
import {useAuthContext} from "../contexts/AuthContext";
import {Additional} from "../components/media/Additional";
import {MediaOperationSection} from "../components/media/MediaOperationSection";
import {ReviewSection} from "../components/media/ReviewSection";
import Loading from "../components/common/Loading";
import {NotFound} from "../components/common/NotFound";
import {getMedia} from "../utils/services/mediaService";


export default function MediaPage() {
  const {setMessage} = useAuthContext();
  const {id} = useParams();
  const [media, setMedia] = useState<Media>();
  const [exist, setExist] = useState(true);
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const media = await getMedia(parseInt(id!));
        setMedia(media);
      } catch (e) {
        const error = e as Error;
        if (error.message === "Not Exist") setExist(false);
        else setMessage("Error fetching media information");
      }
    };
    fetchMedia().then();
  }, [id, setMessage]);

  // Render NotFound component if specific error is caught
  if (!exist) return <NotFound/>;
  return (
    <>
      <PageHeader/>
      {media ? (
        <div className="flex !lg:flex-col items-center lg:items-start justify-center ml-10 mr-10 mt-6 ">
          <div className="flex w-full flex-1 flex-col lg:flex-[0.3]">
            <MyImage
              src={media.imageUrl}
              alt={media.title}
              href={media.imageUrl}
            />
            <div className="hidden lg:block">
              <Additional media={media}/>
            </div>
          </div>
          <div
            className="mb-4 flex w-full flex-1 flex-col border-gray-300 pt-2 text-Neutral lg:flex-[0.7] lg:ml-6 lg:border-t lg:border-l lg:pl-2">
            <MediaInfo media={media} home={false}/>
            <div className="pt-2 text-xl lg:w-2/3">
              <h3 className="pb-2 text-2xl font-semibold">Description:</h3>
              {media.description}
            </div>
            <MediaOperationSection media={media}/>
            <div className="lg:hidden">
              <Additional media={media}/>
            </div>
            <ReviewSection media={media}/>
          </div>
        </div>
      ) : (
        <Loading/>
      )}
    </>
  );
}
