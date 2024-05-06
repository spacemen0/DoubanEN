import { useEffect, useState } from "react";
import { Media } from "../../utils/type";
import { useAuthContext } from "../../contexts/AuthContext";
import { MyImage } from "../common/MyImage";
import { getUserCurrentOn } from "../../apiUtils/userMediaApiUtil.ts";
import { Link } from "react-router-dom";
import { apiUrl } from "../../utils/config.ts";
export function RecentlyOn({ id }: { id: number }) {
  const { setMessage } = useAuthContext();
  const [recentlyOn, setRecentlyOn] = useState<Media[]>();
  useEffect(() => {
    const getCurrentOn = async () => {
      try {
        const items = await getUserCurrentOn(id);
        setRecentlyOn(items);
      } catch (error) {
        setMessage("Error fetching default Music Collection items");
      }
    };
    getCurrentOn().then();
  }, [id, setMessage]);
  if (!recentlyOn) {
    return <></>;
  }
  const music = recentlyOn.find((item) => item.type === "Music");
  const movie = recentlyOn.find((item) => item.type === "Movie");
  const book = recentlyOn.find((item) => item.type === "Book");
  return (
    <div className="w-96 flex-col items-center justify-center gap-2 pb-6 text-lg text-Neutral md:w-[420px] md:pl-4">
      <MediaSection title="Listening" mediaItem={music} />
      <MediaSection title="Watching" mediaItem={movie} />
      <MediaSection title="Reading" mediaItem={book} />
    </div>
  );
}
function MediaSection({
  title,
  mediaItem,
}: {
  title: string;
  mediaItem?: Media;
}) {
  return (
    <div className="mb-2 flex w-full flex-col rounded-md bg-white shadow-md">
      <h1 className="m-2 text-center font-bold">{title}</h1>
      <div className="flex p-2 text-center">
        {mediaItem ? (
          <>
            <div className="h-32 w-32">
              <MyImage
                src={apiUrl + mediaItem.imageUrl}
                alt={mediaItem.title}
              />
            </div>
            <div className="ml-4 flex w-3/4 flex-col justify-center">
              <Link to={`/media/${mediaItem.id}`}>
                <h1 className="w-full text-center font-bold hover:text-Neutral-Strong">
                  {mediaItem.title}
                </h1>
              </Link>
              <Link to={`/author/${mediaItem.author}`}>
                <h1 className="w-full text-center">{mediaItem.author_name}</h1>
              </Link>
            </div>
          </>
        ) : (
          <p className="w-full pb-2 text-center">
            This User is not currently {title.toLowerCase()} anything.
          </p>
        )}
      </div>
    </div>
  );
}
