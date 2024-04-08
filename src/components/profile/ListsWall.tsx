import { useEffect, useState } from "react";
import { getUserLists } from "../../utils/services/mediaListService.ts";
import { ListInfo } from "../../utils/type.ts";
import { useAuthContext } from "../../contexts/AuthContext.ts";
import { Link } from "react-router-dom";

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
        <h2 className="text-Neutral-Strong font-semibold text-2xl px-4 py-4 border-b border-gray-200">
          {username}'s Lists Wall
        </h2>
        {lists.length > 0 ? (
          lists.map((list) => {
            return (
              <div
                className="flex w-full flex-col justify-between border-b border-gray-200 pb-1 align-top"
                key={list.id}
              >
                <Link
                  to={`/list/${list.id}`}
                  className="font-semibold text-Neutral text-xl p-4 hover:text-Neutral-Strong"
                >
                  {list.title}
                </Link>
                <p className="p-4 text-Neutral-Mild">{list.description}</p>
              </div>
            );
          })
        ) : (
          <div className="text-Neutral-Strong font-semibold text-2xl px-4 py-4">
            Nothing here for now
          </div>
        )}
      </div>
    </div>
  );
}
