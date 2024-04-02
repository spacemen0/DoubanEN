import { Link, useParams } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { useEffect, useState } from "react";
import { ListInfo, Media } from "../utils/type";
import { useAuthContext } from "../contexts/AuthContext";
import { Pagination } from "../components/common/Pagination";
import { ListItem } from "../components/common/ListItem";

import {
  getAllListItems,
  getListInfo,
  getListItemsCount,
} from "../utils/services/mediaListService";
import { NotFound } from "../components/common/NotFound";
import { EmptyMedias } from "../components/common/EmptyMedias";

export default function List() {
  const { id } = useParams();
  const [medias, setMedias] = useState<Media[]>([]);
  const [exist, setExist] = useState(true);
  const [listInfo, setListInfo] = useState<ListInfo>();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { setMessage } = useAuthContext();
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
        setMedias(await getAllListItems(parseInt(id!), currentPage));
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
  if (!exist) return <NotFound />;
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />

      <div className="overflow-y-scroll px-2 text-Neutral lg:px-4">
        <p className="my-4 text-3xl font-bold text-Neutral">
          {listInfo?.title}
        </p>
        <span className="text-2xl text-Neutral">
          Created by:{" "}
          <Link
            className="border-b-2 pb-1 font-semibold text-Neutral-Strong border-Neutral-Strong"
            to={`/profile/${listInfo?.userId}`}
          >
            {listInfo?.username}
          </Link>
        </span>
        <p className="my-4 text-xl">{listInfo?.description}</p>
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
            return <ListItem media={media} key={index} />;
          })
        ) : (
          <EmptyMedias />
        )}
      </div>
    </div>
  );
}
