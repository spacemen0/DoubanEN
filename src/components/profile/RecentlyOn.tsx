import { useEffect, useState } from "react";
import { Media } from "../../utils/type";
import { useAuthContext } from "../../contexts/AuthContext";
import { MyImage } from "../common/MyImage";
import { getUserCurrentOn } from "../../apiUtils/userMediaApiUtil.ts";
import { Link } from "react-router-dom";
import { apiUrl } from "../../utils/config.ts";

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
  const music = recentlyOn?.filter((item) => {
    return item.type === "Music";
  })[0];
  const movie = recentlyOn?.filter((item) => {
    return item.type === "Movie";
  })[0];
  const book = recentlyOn?.filter((item) => {
    return item.type === "Book";
  })[0];
  if (!recentlyOn) {
    return <></>;
  }
  return (
    <div className="w-96 flex-col items-center justify-center gap-2 pb-6 text-lg text-Neutral md:w-[420px] md:pl-4">
      <div className="mb-2 flex w-full flex-col rounded-md bg-white shadow-md">
        {" "}
        <h1 className="m-2 text-center font-bold">Listening</h1>
        <div className="flex p-2 text-center">
          {music ? (
            <>
              <div className="h-32 w-32">
                <MyImage src={apiUrl + music.imageUrl} alt={music.title} />
              </div>
              <div className="flex w-3/4 flex-col justify-center">
                {" "}
                <Link to={`/media/${music.id}`}>
                  <h1 className="w-full text-center font-bold hover:text-Neutral-Strong">
                    {music.title}
                  </h1>
                </Link>
                <Link to={`/author/${music.author}`}>
                  <h1 className="w-full text-center">{music.author_name}</h1>
                </Link>
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
          {movie ? (
            <>
              <div className="h-32 w-32">
                <MyImage src={apiUrl + movie.imageUrl} alt={movie.title} />
              </div>

              <div className="ml-4 flex w-3/4 flex-col justify-center">
                <Link to={`/media/${movie.id}`}>
                  <h1 className="w-full text-center font-bold hover:text-Neutral-Strong">
                    {movie.title}
                  </h1>
                </Link>
                <Link to={`/author/${movie.author}`}>
                  <h1 className="w-full text-center">{movie.author_name}</h1>
                </Link>
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
          {book ? (
            <>
              <div className="h-32 w-32">
                <MyImage src={apiUrl + book.imageUrl} alt={book.title} />
              </div>

              <div className="ml-4 flex w-3/4 flex-col justify-center">
                {" "}
                <Link to={`/media/${book.id}`}>
                  <h1 className="w-full text-center font-bold hover:text-Neutral-Strong">
                    {book.title}
                  </h1>
                </Link>
                <Link to={`/author/${book.author}`}>
                  {" "}
                  <h1 className="w-full text-center">{book.author_name}</h1>
                </Link>
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
