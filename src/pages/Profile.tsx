import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { useParams } from "react-router-dom";
import { RecentlyOn } from "../components/profile/RecentlyOn";
import { InfoCard } from "../components/profile/InfoCard.tsx";
import { Ratings } from "../components/profile/Ratings.tsx";
import { useEffect, useState } from "react";
import { NotFound } from "../components/common/NotFound";
import { ListsWall } from "../components/profile/ListsWall.tsx";
import { Reviews } from "../components/profile/Reviews.tsx";
import { CommentSection } from "../components/common/CommentSection.tsx";
import { OwnComments } from "../components/profile/OwnComments.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { AuthorRequest, MediaRequest } from "../utils/type.ts";
import {
  getAllAuthorRequestsByUserId,
  getAllMediaRequestsByUserId,
} from "../apiUtils/userRequestApiUtil.ts";
import { UserMediaRequestItem } from "../components/profile/UserMediaRequestItem.tsx";
import { UserAuthorRequestItem } from "../components/profile/UserAuthorRequestItem.tsx";
import { useAuthStore } from "../contexts/AuthStore.ts";

export default function Profile() {
  const { id } = useParams();
  const [exist, setExist] = useState(true);
  const [username, setUsername] = useState<string>("");
  const [mediaRequests, setMediaRequests] = useState<MediaRequest[]>([]);
  const [authorRequests, setAuthorRequests] = useState<AuthorRequest[]>([]);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setMessage = useAuthStore((state) => state.setMessage);
  useEffect(() => {
    const fetchMediaRequests = async () => {
      if (user && token)
        try {
          setMediaRequests(await getAllMediaRequestsByUserId(user.id, token));
        } catch (e) {
          const error = e as Error;
          setMessage(error.message);
        }
    };
    fetchMediaRequests().then();
  }, [setMessage, token, user]);

  useEffect(() => {
    const fetchAuthorRequests = async () => {
      if (user && token)
        try {
          setAuthorRequests(await getAllAuthorRequestsByUserId(user.id, token));
        } catch (e) {
          const error = e as Error;
          setMessage(error.message);
        }
    };
    fetchAuthorRequests().then();
  }, [setMessage, token, user]);
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
          {user && user.id === parseInt(id) && mediaRequests.length > 0 && (
            <ul className="border-t-2 bg-gray-100 px-2 py-4 md:px-4 lg:px-6">
              <h2 className="my-4 text-2xl font-bold">Your Media Requests</h2>
              {mediaRequests.map((mediaRequest) => (
                <UserMediaRequestItem
                  mediaRequest={mediaRequest}
                  key={mediaRequest.id}
                />
              ))}
            </ul>
          )}
          {user && user.id === parseInt(id) && authorRequests.length > 0 && (
            <ul className="border-t-2 bg-gray-100 px-2 py-4 md:px-4 lg:px-6">
              <h2 className="my-4 text-2xl font-bold">Your Author Requests</h2>
              {authorRequests.map((authorRequest) => (
                <UserAuthorRequestItem
                  authorRequest={authorRequest}
                  key={authorRequest.id}
                />
              ))}
            </ul>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
