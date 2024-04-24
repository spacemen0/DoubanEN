import { PageHeader } from "../components/common/PageHeader";
import { useParams } from "react-router-dom";
import { RecentlyOn } from "../components/profile/RecentlyOn";
import { InfoCard } from "../components/profile/InfoCard.tsx";
import { Ratings } from "../components/profile/Ratings.tsx";
import { useState } from "react";
import { NotFound } from "../components/common/NotFound";
import { ListsWall } from "../components/profile/ListsWall.tsx";
import { Reviews } from "../components/profile/Reviews.tsx";
import { CommentSection } from "../components/common/CommentSection.tsx";

export default function Profile() {
  const { id } = useParams();
  const [exist, setExist] = useState(true);
  const [username, setUsername] = useState<string>("");
  if (!exist || !id) return <NotFound />;
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll">
        <div className="mx-auto flex h-auto w-full flex-col lg:10/12">
          <div className="flex !md:flex-col gap-5 lg:gap-10 justify-center items-center px-4 py-4 lg:py-8 bg-gray-100">
            <InfoCard
              id={parseInt(id)}
              setExist={setExist}
              setUsername={setUsername}
            />
            <RecentlyOn id={parseInt(id)} />
            <ListsWall id={parseInt(id)} username={username} />
          </div>
          <div className="px-2 md:px-4 lg:px-6 bg-gray-100 py-4 border-t-2">
            {" "}
            <CommentSection
              area={"User"}
              areaId={parseInt(id)}
              message={true}
            />
          </div>

          <Ratings id={parseInt(id)} username={username} />
          <Reviews id={parseInt(id)} username={username} />
        </div>
      </div>
    </div>
  );
}
