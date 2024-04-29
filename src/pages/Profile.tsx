import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { useParams } from "react-router-dom";
import { RecentlyOn } from "../components/profile/RecentlyOn";
import { InfoCard } from "../components/profile/InfoCard.tsx";
import { Ratings } from "../components/profile/Ratings.tsx";
import { useState } from "react";
import { NotFound } from "../components/common/NotFound";
import { ListsWall } from "../components/profile/ListsWall.tsx";
import { Reviews } from "../components/profile/Reviews.tsx";
import { CommentSection } from "../components/common/CommentSection.tsx";
import { useAuthContext } from "../contexts/AuthContext.ts";
import { OwnComments } from "../components/profile/OwnComments.tsx";
import { Footer } from "../components/common/Footer.tsx";

export default function Profile() {
  const { id } = useParams();
  const [exist, setExist] = useState(true);
  const [username, setUsername] = useState<string>("");
  const { user } = useAuthContext();
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
          {user && user.id === parseInt(id) && (
            <div className="border-t-2 bg-gray-100 px-2 py-4 md:px-4 lg:px-6">
              {" "}
              <OwnComments />
            </div>
          )}
          <div className="border-t-2 bg-gray-100 px-2 py-4 md:px-4 lg:px-6">
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
        <Footer />
      </div>
    </div>
  );
}
