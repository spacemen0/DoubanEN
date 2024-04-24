import { useEffect, useState } from "react";
import { ListInfo } from "../../utils/type.ts";
import { useAuthContext } from "../../contexts/AuthContext.ts";
import { Link } from "react-router-dom";
import { getUserLists } from "../../apiUtils/mediaListApiUtil.ts";
import { MyImage } from "../common/MyImage.tsx";
import { apiUrl } from "../../utils/config.ts";

export function ListsWall({ id, username }: { id: number; username: string }) {
  const { setMessage } = useAuthContext();
  const [lists, setLists] = useState<ListInfo[]>();
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const userLists = await getUserLists(id);
        setLists(userLists.slice(0, 3));
      } catch (e) {
        const error = e as Error;
        if (error.message === "Response Error")
          setMessage("Error processing request");
        else setMessage("Error fetching lists for this user");
      }
    };
    fetchLists().then();
  }, [setMessage, id]);
  if (!lists) return <></>;
  return (
    <div className="w-96 flex-col items-center justify-center gap-2 pb-6 text-lg text-gray-600 md:w-[420px] md:pl-4">
      <div className="mb-2 flex w-full flex-col rounded-md bg-white shadow-md">
        <h2 className="border-b border-gray-200 px-4 py-4 text-2xl font-semibold text-Neutral-Strong">
          {username}'s Lists Wall
        </h2>
        {lists.length > 0 ? (
          lists.map((list, index) => {
            return (
              <div
                key={list.id}
                className={`flex items-center justify-center py-2 border-gray-200 align-top ${index !== lists.length - 1 && "border-b"}`}
              >
                <div className="ml-2 h-32 w-32 shrink-0">
                  <MyImage src={apiUrl + list.imageUrl} alt={list.title} />
                </div>
                <div className={`flex w-full flex-col justify-between p-1 `}>
                  <Link
                    to={`/list/${list.id}`}
                    className="p-4 text-xl font-semibold text-Neutral hover:text-Neutral-Strong"
                  >
                    {list.title}
                  </Link>
                  <p className="p-4 text-Neutral-Mild">
                    {list.description.slice(0, 80)}
                    {list.description.length > 80 && (
                      <span className="text-center text-Neutral-Strong">
                        {" "}
                        ...
                      </span>
                    )}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-4 py-4 text-2xl font-semibold text-Neutral-Mild">
            Nothing here for now
          </div>
        )}
      </div>
    </div>
  );
}
