import { useParams } from "react-router-dom";
import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { useCallback, useEffect, useState } from "react";
import { Media } from "../utils/type";
import { FullImage } from "../components/common/FullImage.tsx";
import { MediaInfo } from "../components/common/MediaInfo";
import { useAuthContext } from "../contexts/AuthContext";
import { DomainSection } from "../components/media/DomainSection.tsx";
import { MediaActionsSection } from "../components/media/MediaActionsSection.tsx";
import { ReviewSection } from "../components/media/ReviewSection";
import Loading from "../components/common/Loading";
import { NotFound } from "../components/common/NotFound";
import { getMedia } from "../apiUtils/mediaApiUtil.ts";
import { apiUrl } from "../utils/config.ts";
import { CommentSection } from "../components/common/CommentSection.tsx";
import { Footer } from "../components/common/Footer.tsx";

export default function MediaPage() {
  const { setMessage } = useAuthContext();
  const { id } = useParams();
  const [media, setMedia] = useState<Media>();
  const [exist, setExist] = useState(true);
  const [render, setRender] = useState(false);
  const fetchMedia = useCallback(async () => {
    try {
      const fetchedMedia = await getMedia(parseInt(id!));
      setMedia(fetchedMedia);
    } catch (e) {
      const error = e as Error;
      if (error.message === "Not Exist") setExist(false);
      else setMessage(error.message);
    }
  }, [id, setMessage]);

  useEffect(() => {
    fetchMedia().then();
  }, [fetchMedia]);

  const handleOnSuccessAndRender = async () => {
    await fetchMedia();
    setRender(true);
  };

  // Render NotFound component if specific error is caught
  if (!exist || !id) return <NotFound />;
  return media ? (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll">
        <div className="flex !lg:flex-col items-center lg:items-start justify-center ml-10 mr-10 mt-6 ">
          <div className="flex w-full flex-1 flex-col lg:flex-[0.3]">
            <FullImage src={apiUrl + media.imageUrl} alt={media.title} />
            <div className="hidden lg:block">
              <DomainSection media={media} />
            </div>
            <div className="hidden lg:block">
              <CommentSection area={"Media"} areaId={parseInt(id)} />
            </div>
          </div>
          <div className="mb-4 flex w-full flex-1 flex-col border-gray-300 pt-2 text-Neutral lg:flex-[0.7] lg:ml-6 lg:border-t lg:border-l lg:pl-2">
            <MediaInfo media={media} home={false} />
            <div className="pt-2 text-xl lg:w-2/3">
              <h3 className="pb-2 text-2xl font-semibold">Description:</h3>
              {media.description}
            </div>
            <MediaActionsSection
              media={media}
              onSuccess={fetchMedia}
              onSuccessAndRender={handleOnSuccessAndRender}
            />
            <div className="lg:hidden">
              <DomainSection media={media} />
            </div>
            <div className="lg:hidden">
              <CommentSection area={"Media"} areaId={parseInt(id)} />
            </div>
            <ReviewSection
              media={media}
              render={render}
              setRender={setRender}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  ) : (
    <Loading />
  );
}
