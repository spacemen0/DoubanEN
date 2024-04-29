import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Media, MediaType } from "../utils/type";
import { useAuthContext } from "../contexts/AuthContext";
import { NotFound } from "../components/common/NotFound";
import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import {
  getUserMediaByTypeWithPagination,
  getUserMediaCountByType,
} from "../apiUtils/userMediaApiUtil.ts";
import Loading from "../components/common/Loading.tsx";
import { CollectionMediasDisplay } from "../components/collection/ColectionMediaDisplay.tsx";
import { OptionSelect } from "../components/collection/OptionSelect.tsx";
import { Footer } from "../components/common/Footer.tsx";

export default function Collection() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [medias, setMedias] = useState<Media[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<
    "Rated" | "Wishlist" | "Doing" | "Reviewed"
  >("Rated");
  const { setMessage, user } = useAuthContext();
  useEffect(() => {
    const fetchMediasCount = async (type: MediaType) => {
      if (user)
        try {
          setLoading(true);
          const fetchedCount = await getUserMediaCountByType(
            user.id,
            type,
            selectedOption,
          );
          setCount(fetchedCount);
        } catch (error) {
          setMessage(`Error fetching total number of ${type}s`);
        }
    };
    if (type) fetchMediasCount(type as MediaType).then();
  }, [selectedOption, setMessage, type, user]);

  useEffect(() => {
    const fetchAllMedias = async () => {
      if (user)
        try {
          setLoading(true);
          setMedias(
            await getUserMediaByTypeWithPagination(
              user.id,
              type as MediaType,
              currentPage,
              selectedOption,
            ),
          );
          setLoading(false);
        } catch (e) {
          const error = e as Error;
          setMessage(error.message);
        }
    };
    fetchAllMedias().then();
  }, [currentPage, selectedOption, setMessage, type, user]);

  function handleOptionClick(
    status: "Rated" | "Wishlist" | "Doing" | "Reviewed",
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
        <OptionSelect
          selectedOption={selectedOption}
          handleOptionClick={handleOptionClick}
          setCurrentPage={setCurrentPage}
          type={type}
        />
        <CollectionMediasDisplay
          medias={medias}
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
