import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { useEffect, useState } from "react";
import { ListInfo, Media } from "../utils/type";
import { useAuthContext } from "../contexts/AuthContext";

import {
  deleteList,
  getAllListItems,
  getListInfo,
  getListItemsCount,
} from "../apiUtils/mediaListApiUtil.ts";
import { NotFound } from "../components/common/NotFound";
import Loading from "../components/common/Loading.tsx";
import { ListHeader } from "../components/list/ListHeader.tsx";
import { ListMediaDisplay } from "../components/list/ListMediaDisplay.tsx";
import { CommentSection } from "../components/common/CommentSection.tsx";
import { Footer } from "../components/common/Footer.tsx";

export default function List() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState<Media[]>([]);
  const [exist, setExist] = useState<boolean>();
  const [listInfo, setListInfo] = useState<ListInfo>();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { setMessage, user } = useAuthContext();
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
    fetchListCount(parseInt(id!)).then();
  }, [id, setMessage]);

  useEffect(() => {
    const fetchAllListItems = async () => {
      try {
        setMedia(await getAllListItems(parseInt(id!), currentPage));
        setExist(true);
      } catch (e) {
        const error = e as Error;
        if (error.message === "Not Exist") setExist(false);
        else if (error.message === "Response error")
          setMessage("Error fetching list items");
        else setMessage("Error processing request");
      }
    };
    fetchAllListItems().then();
  }, [currentPage, id, setMessage]);

  useEffect(() => {
    const fetchListInfo = async () => {
      try {
        setListInfo(await getListInfo(parseInt(id!)));
      } catch (e) {
        const error = e as Error;
        if (error.message === "Not Exist") setExist(false);
        else if (error.message === "Response error")
          setMessage("Error fetching list info");
        else setMessage("Error processing request");
      }
    };
    fetchListInfo().then();
  }, [currentPage, id, setMessage]);
  async function handleDeleteList(id: number, token: string) {
    if (user)
      try {
        await deleteList(id, token);
        navigate(`/lists/${user.id}`);
        setExist(false);
        setMedia([]);
        setCount(0);
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
  }
  if (exist === undefined || !id) return <Loading />;
  else if (!exist) return <NotFound />;
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll flex flex-col justify-between h-screen">
        <div className="mb-4 px-2 text-Neutral lg:mb-8 lg:px-4">
          {listInfo && (
            <ListHeader
              listInfo={listInfo}
              handleDeleteList={handleDeleteList}
            />
          )}
          <ListMediaDisplay
            count={count}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            medias={media}
          />
          <CommentSection area={"MediaList"} areaId={parseInt(id)} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
