import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Media, MediaType } from "../utils/type";
import { NotFound } from "../components/common/NotFound";
import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import {
  getUserMediaByTypeWithPagination,
  getUserMediaCountByType,
} from "../apiUtils/userMediaApiUtil.ts";
import Loading from "../components/common/Loading.tsx";
import { CollectionMediaDisplay } from "../components/collection/ColectionMediaDisplay.tsx";
import { StatusOptionSelect } from "../components/collection/StatusOptionSelect.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { useAuthStore } from "../contexts/AuthStore.ts";

export default function Collection() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [media, setMedia] = useState<Media[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<
    "Rated" | "Wishlist" | "Doing" | "Reviewed"
  >("Rated");
  const user = useAuthStore((state) => state.user);
  const setMessage = useAuthStore((state) => state.setMessage);
  useEffect(() => {
    const fetchMediaCount = async (type: MediaType) => {
      if (user)
        try {
          setLoading(true);
          const fetchedCount = await getUserMediaCountByType(
            user.id,
            type,
            selectedOption
          );
          setCount(fetchedCount);
        } catch (e) {
          const error = e as Error;
          setMessage(error.message);
        }
    };
    if (type) fetchMediaCount(type as MediaType).then();
  }, [selectedOption, setMessage, type, user]);

  useEffect(() => {
    const fetchAllMedia = async () => {
      if (user)
        try {
          setLoading(true);
          setMedia(
            await getUserMediaByTypeWithPagination(
              user.id,
              type as MediaType,
              currentPage,
              selectedOption
            )
          );
          setLoading(false);
        } catch (e) {
          const error = e as Error;
          setMessage(error.message);
        }
    };
    fetchAllMedia().then();
  }, [currentPage, selectedOption, setMessage, type, user]);

  function handleOptionClick(
    status: "Rated" | "Wishlist" | "Doing" | "Reviewed"
  ) {
    setSelectedOption(status);
  }

  if (!["Music", "Movie", "Book", "All"].includes(type!)) {
    return <NotFound />;
  }
  if (loading) return <Loading />;
  if (!type) return <NotFound />;
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll px-2 lg:px-4 flex flex-col justify-between h-screen">
        <StatusOptionSelect
          selectedOption={selectedOption}
          handleOptionClick={handleOptionClick}
          setCurrentPage={setCurrentPage}
          type={type}
        />
        <CollectionMediaDisplay
          media={media}
          count={count}
          type={type}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <Footer />
      </div>
    </div>
  );
}
