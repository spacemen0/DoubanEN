import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { useEffect, useState } from "react";
import { AuthorRequest, MediaRequest } from "../utils/type.ts";
import {
  getAllAuthorRequestsByStatus,
  getAllMediaRequestsByStatus,
} from "../apiUtils/userRequestApiUtil.ts";
import { useAuthContext } from "../contexts/AuthContext.ts";
import { MediaRequestItem } from "../components/admin/MediaRequestItem.tsx";
import { Link } from "react-router-dom";
import { EmptyContent } from "../components/common/EmptyContent.tsx";
import { AuthorRequestItem } from "../components/admin/AuthorRequestItem.tsx";
import { DeleteSection } from "../components/admin/DeleteSection.tsx";

export default function Admin() {
  const [mediaRequests, setMediaRequests] = useState<MediaRequest[]>();
  const [authorRequests, setAuthorRequests] = useState<AuthorRequest[]>();
  const { token, setMessage, user } = useAuthContext();
  useEffect(() => {
    const fetchRequests = async () => {
      if (token)
        try {
          setMediaRequests(await getAllMediaRequestsByStatus("Pending", token));
        } catch (e) {
          const error = e as Error;
          setMessage(error.message);
        }
    };
    fetchRequests().then();
  }, [setMessage, token]);
  useEffect(() => {
    const fetchRequests = async () => {
      if (token)
        try {
          setAuthorRequests(
            await getAllAuthorRequestsByStatus("Pending", token),
          );
        } catch (e) {
          const error = e as Error;
          setMessage(error.message);
        }
    };
    fetchRequests().then();
  }, [setMessage, token]);
  if (user && user.role === "Admin")
    return (
      <div className="flex max-h-screen flex-col overflow-hidden">
        <PageHeader />

        <div className="overflow-y-scroll flex flex-col justify-between h-screen">
          {" "}
          <DeleteSection />
          <div>
            {mediaRequests &&
              mediaRequests.length > 0 &&
              mediaRequests.map((mediaRequest) => (
                <MediaRequestItem
                  request={mediaRequest}
                  key={mediaRequest.id}
                />
              ))}
            {authorRequests &&
              authorRequests.length > 0 &&
              authorRequests.map((authorRequest) => (
                <AuthorRequestItem
                  request={authorRequest}
                  key={authorRequest.id}
                />
              ))}
            {!(
              (mediaRequests && mediaRequests.length > 0) ||
              (authorRequests && authorRequests.length > 0)
            ) && <EmptyContent text="No requests from user currently" />}
          </div>
          <Footer />
        </div>
      </div>
    );
  return (
    <h1 className="text-3xl  mx-auto my-20 font-bold text-Neutral text-center">
      You are not allowed here. Go back to{" "}
      <Link to="/" className="hover:text-Neutral-Strong underline">
        Home page
      </Link>
    </h1>
  );
}
