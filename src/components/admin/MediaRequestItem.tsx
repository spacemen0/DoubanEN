import { Media, MediaRequest, User } from "../../utils/type.ts";
import { DomainSection } from "../media/DomainSection.tsx";
import { mediaRequestToMedia, processMediaJson } from "../../utils/helper.ts";
import React, { useEffect, useState } from "react";
import { MediaRequestInfo } from "./MediaRequestInfo.tsx";
import { fetchUser } from "../../apiUtils/userApiUtil.ts";
import { processMediaRequest } from "../../apiUtils/userRequestApiUtil.ts";
import { useAuthContext } from "../../contexts/AuthContext.ts";
import { ProcessRequest } from "./ProcessRequest.tsx";

export function MediaRequestItem({
  request,
  setMediaRequests,
}: {
  request: MediaRequest;
  setMediaRequests: React.Dispatch<React.SetStateAction<MediaRequest[]>>;
}) {
  const [media, setMedia] = useState<Media>();
  const [user, setUser] = useState<User>();
  const { token, setMessage } = useAuthContext();

  const handleProcessRequest = async (
    approve: boolean,
    responseMessage: string,
  ) => {
    if (responseMessage === "") {
      setMessage("Please write a response message");
      return;
    }
    if (token)
      try {
        await processMediaRequest(request.id, approve, responseMessage, token);
        setMediaRequests((previousState) =>
          previousState.filter((pre) => pre.id !== request.id),
        );
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
    else return;
  };
  useEffect(() => {
    const convertMedia = () => {
      setMedia(mediaRequestToMedia(request));
    };

    convertMedia();
  }, [request]);
  useEffect(() => {
    const getUser = async () => {
      setUser(await fetchUser(request.userId));
    };

    getUser().then();
  }, [request.userId]);
  if (media && user)
    return (
      <div className="flex !lg:flex-col border-2 rounded-md mt-2">
        <h1 className="lg:[writing-mode:vertical-rl] text-xl font-bold text-Neutral-Strong mt-4 mx-2">
          Media Request-{request.id}
        </h1>
        <div className="flex-1 my-4 mr-4 ml-2">
          <MediaRequestInfo media={media} time={request.actionTime} by={user} />
        </div>
        <div className="flex-1 mx-2 border rounded-md my-4 p-2">
          <DomainSection media={processMediaJson(media)} />
        </div>
        <ProcessRequest handleProcessRequest={handleProcessRequest} />
      </div>
    );
}
