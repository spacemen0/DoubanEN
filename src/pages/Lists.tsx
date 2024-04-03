import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser } from "../utils/services/authService.ts";
import { useAuthContext } from "../contexts/AuthContext.ts";
import Loading from "../components/common/Loading.tsx";
import { NotFound } from "../components/common/NotFound.tsx";
import {
  deleteList,
  getAllListItems,
  getListItemsCount,
  getUserLists,
  removeMediaFromList,
} from "../utils/services/mediaListService.ts";
import { ListInfo, Media } from "../utils/type.ts";
import { PageHeader } from "../components/common/PageHeader.tsx";
import { Pagination } from "../components/common/Pagination.tsx";
import { ListItem } from "../components/common/ListItem.tsx";
import { EmptyMedias } from "../components/common/EmptyMedias.tsx";
import { X } from "lucide-react";

export default function Lists() {
  const { userId } = useParams();
  const [username, setUsername] = useState<string>();
  const [exist, setExist] = useState<boolean>();
  const [selectedList, setSelectedList] = useState<number>();
  const [lists, setLists] = useState<ListInfo[]>([]);
  const [medias, setMedias] = useState<Media[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { setMessage, user, token } = useAuthContext();
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = await fetchUser(parseInt(userId!));
        setUsername(user.username);
        setExist(true);
      } catch (e) {
        const error = e as Error;
        if (error.message === "Not exist") {
          setExist(false);
          setMessage("This user does not exist");
        } else if (error.message === "Response error")
          setMessage("Error processing request");
        else setMessage("Error fetching username for this user");
      }
    };
    if (user?.id === userId) setUsername(user!.username);
    else fetchUsername().then();
  }, [user, userId, setMessage]);
  useEffect(() => {
    const fetchLists = async () => {
      if (exist)
        try {
          const userLists = await getUserLists(parseInt(userId!));
          setLists(userLists);
          if (userLists.length > 0) setSelectedList(userLists[0].id);
        } catch (e) {
          const error = e as Error;
          if (error.message === "Response Error")
            setMessage("Error processing request");
          else setMessage("Error fetching lists for this user");
        }
    };
    if (exist) fetchLists().then();
  }, [exist, setMessage, userId]);
  useEffect(() => {
    const fetchListCount = async (id: number) => {
      try {
        const fetchedCount = await getListItemsCount(id);
        setCount(fetchedCount);
      } catch (error) {
        const e = error as Error;
        if (e.message === "Response error")
          setMessage("Error fetching list items count");
        else setMessage("Error processing request");
      }
    };
    if (selectedList) fetchListCount(selectedList).then();
  }, [selectedList, setMessage]);

  useEffect(() => {
    const fetchAllListItems = async (id: number) => {
      try {
        setMedias(await getAllListItems(id, currentPage));
        setExist(true);
      } catch (e) {
        const error = e as Error;
        if (error.message === "Not Exist") setExist(false);
        else if (error.message === "Response error")
          setMessage("Error fetching list items");
        else setMessage("Error processing request");
      }
    };
    if (selectedList) fetchAllListItems(selectedList).then();
  }, [currentPage, selectedList, setMessage]);

  async function handleDeleteList() {
    try {
      if (selectedList && token) await deleteList(selectedList, token);
      setMedias([]);
      setCount(0);
      const newLists = lists.filter((list) => list.id !== selectedList);
      setLists(newLists);
      setSelectedList(newLists[0].id);
    } catch (e) {
      const error = e as Error;
      setMessage(error.message);
    }
  }

  const handleRemoveListItem = async (mediaId: number) => {
    try {
      if (selectedList && token)
        await removeMediaFromList(selectedList, mediaId, token);
      setMedias(medias.filter((media) => media.id !== mediaId));
      setCount(count - 1);
    } catch (e) {
      const error = e as Error;
      setMessage(error.message);
    }
  };
  if (exist === undefined) return <Loading />;
  if (exist && username)
    return (
      <div className="flex max-h-screen flex-col overflow-hidden">
        <PageHeader />
        <div className="overflow-y-scroll text-Neutral">
          <div className="mx-2 mt-4 flex items-center justify-center text-xl font-semibold md:mt-8 md:gap-4 md:text-3xl lg:font-bold">
            <h1>{username}'s Lists:</h1>
            {lists.length > 0 ? (
              <select
                id="chooseList"
                onChange={(event) => {
                  setSelectedList(parseInt(event.target.value));
                }}
                onFocus={(event) => {
                  setSelectedList(parseInt(event.target.value));
                }}
                value={selectedList}
                className="mx-2 border-b-2 border-gray-400 py-1 text-center align-middle focus:outline-0"
              >
                {lists.map((list) => (
                  <option value={list.id} key={list.id}>
                    {list.title}
                  </option>
                ))}
                {lists.length === 1 && (
                  <option value={lists[0].id} key={lists[0].id} hidden>
                    {lists[0].title}
                  </option>
                )}
              </select>
            ) : (
              <p className="">No lists were found.</p>
            )}
          </div>
          {selectedList ? (
            <div className="mx-2">
              <div className="bg-gray-200 p-2 rounded-md md:mt-4 mt-2 w-fit">
                <p className="my-2 text-3xl font-bold text-Neutral">
                  {lists.filter((list) => list.id === selectedList)[0].title}
                </p>
                <p className="my-4 text-xl font-semibold">
                  {
                    lists.filter((list) => list.id === selectedList)[0]
                      .description
                  }
                </p>
                {user?.id === parseInt(userId!) && (
                  <button
                    className="rounded-md p-1.5 font-semibold text-white bg-Neutral-Mild hover:bg-Neutral mb-4 text-lg"
                    onClick={handleDeleteList}
                  >
                    Delete this list
                  </button>
                )}
              </div>

              <Pagination
                title={`${count} List Items`}
                count={count}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
              <div className="my-2 flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:gap-9 lg:pl-36 2xl:pl-44 3xl:pl-56">
                <span>Average</span> <span>Rated</span> <span>Wants</span>
              </div>
              {medias.length > 0 ? (
                medias.map((media, index) => {
                  return (
                    <div className="relative" key={index}>
                      <ListItem media={media} />
                      {user?.id === parseInt(userId!) && (
                        <button
                          className="absolute right-2 top-0"
                          onClick={async () => {
                            await handleRemoveListItem(media.id);
                          }}
                        >
                          <X
                            color={
                              media.type === "Music"
                                ? "#0A8F08"
                                : media.type === "Movie"
                                  ? "#039BE5"
                                  : "#B0120A"
                            }
                            size="28px"
                          />
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <EmptyMedias />
              )}
            </div>
          ) : (
            <EmptyMedias />
          )}
        </div>
      </div>
    );
  else if (!exist) return <NotFound />;
}
