import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser } from "../apiUtils/userApiUtil.ts";
import { useAuthContext } from "../contexts/AuthContext.ts";
import Loading from "../components/common/Loading.tsx";
import { NotFound } from "../components/common/NotFound.tsx";
import {
  deleteList,
  getAllListItems,
  getListItemsCount,
  getUserLists,
  removeMediaFromList,
} from "../apiUtils/mediaListApiUtil.ts";
import { ListInfo, Media } from "../utils/type.ts";
import { PageHeader } from "../components/common/PageHeader.tsx";
import { EmptyContent } from "../components/common/EmptyContent.tsx";
import { SelectUserList } from "../components/lists/SelectUserList.tsx";
import { ListHeader } from "../components/lists/ListHeader.tsx";
import { ListMediasDisplay } from "../components/lists/ListMediasDisplay.tsx";

export default function Lists() {
  const { userId } = useParams();
  const [username, setUsername] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [selectedList, setSelectedList] = useState<number>(-1);
  const [lists, setLists] = useState<ListInfo[]>([]);
  const [medias, setMedias] = useState<Media[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { setMessage, user, token } = useAuthContext();
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        setLoading(true);
        const user = await fetchUser(parseInt(userId!));
        setUsername(user.username);
      } catch (e) {
        const error = e as Error;
        if (error.message === "Not exist") {
          setLoading(false);
          setMessage("This user does not exist");
        } else if (error.message === "Response error")
          setMessage("Error processing request");
        else setMessage("Error fetching username for this user");
      }
    };
    if (user && userId && user.id === parseInt(userId))
      setUsername(user.username);
    else fetchUsername().then();
  }, [user, userId, setMessage]);
  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const userLists = await getUserLists(parseInt(userId!));
        setLists(userLists);
        setLoading(false);
        if (userLists.length > 0) setSelectedList(userLists[0].id);
      } catch (e) {
        const error = e as Error;
        if (error.message === "Response Error")
          setMessage("Error processing request");
        else setMessage("Error fetching lists for this user");
      }
    };
    if (loading) fetchLists().then();
  }, [loading, setMessage, userId]);
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
    if (selectedList !== -1) fetchListCount(selectedList).then();
  }, [selectedList, setMessage]);

  useEffect(() => {
    const fetchAllListItems = async (id: number) => {
      try {
        setMedias(await getAllListItems(id, currentPage));
      } catch (e) {
        const error = e as Error;
        if (error.message === "Response error")
          setMessage("Error fetching list items");
        else setMessage("Error processing request");
      }
    };
    if (selectedList !== -1) fetchAllListItems(selectedList).then();
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

  if (loading) return <Loading />;
  if (username)
    return (
      <div className="flex max-h-screen flex-col overflow-hidden">
        <PageHeader />
        <div className="overflow-y-scroll text-Neutral">
          <SelectUserList
            username={username}
            lists={lists}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
            setCurrentPage={setCurrentPage}
          />
          {selectedList ? (
            <div className="mx-2">
              <ListHeader
                lists={lists}
                selectedList={selectedList}
                setLists={setLists}
                setSelectedList={setSelectedList}
                userId={userId}
                handleDeleteList={handleDeleteList}
                user={user}
              />
              <ListMediasDisplay
                medias={medias}
                count={count}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                selectedList={selectedList}
                handleRemoveListItem={handleRemoveListItem}
                userId={userId}
                user={user}
              />
            </div>
          ) : (
            <EmptyContent />
          )}
        </div>
      </div>
    );
  else if (!loading) return <NotFound />;
}
