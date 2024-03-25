import { useEffect, useState } from "react";
import { Media } from "../../utils/type";
import { useAuthContext } from "../../contexts/AuthContext";
import { MyImage } from "../common/MyImage";
import { getUserCurrentOn } from "../../utils/services/userMediasService";

export function RecentlyOn({ id }: { id: number }) {
  const { setMessage } = useAuthContext();
  const [recentlyOn, SetRecentlyOn] = useState<Media[]>();
  useEffect(() => {
    const getCurrentOn = async () => {
      try {
        const items = await getUserCurrentOn(id);
        SetRecentlyOn(items);
      } catch (error) {
        setMessage("Error fetching default Music Collection items");
      }
    };
    getCurrentOn().then();
  }, [id, setMessage]);
  if (!recentlyOn) {
    return <></>;
  }
  return (
    <div className="w-96 flex-col items-center justify-center gap-2 pb-6 text-lg text-gray-600 md:w-[420px] md:pl-4">
      <div className="mb-2 flex w-full flex-col rounded-md bg-white shadow-md">
        {" "}
        <h1 className="m-2 text-center font-bold">Listening</h1>
        <div className="flex p-2 text-center">
          {recentlyOn.length >= 1 ? (
            <>
              <div className="h-32 w-32">
                <MyImage
                  src={recentlyOn[0].imageUrl}
                  alt={recentlyOn[0].title}
                  href={`/media/${recentlyOn[0].type}/${recentlyOn[0].id}`}
                />
              </div>
              <div className="flex w-3/4 flex-col justify-center">
                {" "}
                <h1 className="w-full text-center font-bold">
                  {recentlyOn[0].title}
                </h1>
                <h1 className="w-full text-center">{recentlyOn[0].author}</h1>
              </div>
            </>
          ) : (
            <p className="w-full pb-2 text-center">
              This User is not currently listening to anything.
            </p>
          )}
        </div>
      </div>
      <div className="mb-2 flex w-full flex-col rounded-md bg-white shadow-md">
        {" "}
        <h1 className="m-2 text-center font-bold">Watching</h1>
        <div className="flex p-2 text-center">
          {recentlyOn.length >= 2 ? (
            <>
              <div className="h-32 w-32">
                <MyImage
                  src={recentlyOn[1].imageUrl}
                  alt={recentlyOn[1].title}
                  href={`/media/${recentlyOn[1].type}/${recentlyOn[1].id}`}
                />
              </div>

              <div className="ml-4 flex w-3/4 flex-col justify-center">
                {" "}
                <h1 className="w-full text-center font-bold">
                  {recentlyOn[1].title}
                </h1>
                <h1 className="w-full text-center">{recentlyOn[1].author}</h1>
              </div>
            </>
          ) : (
            <p className="w-full pb-2 text-center">
              This User is not currently watching anything.
            </p>
          )}
        </div>
      </div>
      <div className="mb-2 flex w-full flex-col rounded-md bg-white shadow-md">
        {" "}
        <h1 className="m-2 text-center font-bold">Reading</h1>
        <div className="flex p-2 text-center">
          {recentlyOn.length >= 3 ? (
            <>
              <div className="h-32 w-32">
                <MyImage
                  src={recentlyOn[2].imageUrl}
                  alt={recentlyOn[2].title}
                  href={`/media/${recentlyOn[2].type}/${recentlyOn[2].id}`}
                />
              </div>

              <div className="ml-4 flex w-3/4 flex-col justify-center">
                {" "}
                <h1 className="w-full text-center font-bold">
                  {recentlyOn[2].title}
                </h1>
                <h1 className="w-full text-center">{recentlyOn[2].author}</h1>
              </div>
            </>
          ) : (
            <p className="w-full pb-2 text-center">
              This User is not recently reading anything.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
