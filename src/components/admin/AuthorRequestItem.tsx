import { AuthorRequest, User } from "../../utils/type.ts";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext.ts";
import { processAuthorRequest } from "../../apiUtils/userRequestApiUtil.ts";
import { fetchUser } from "../../apiUtils/userApiUtil.ts";
import { AuthorRequestInfo } from "./AuthorRequestInfo.tsx";
import { authorRequestToAuthor } from "../../utils/helper.ts";
import { ProcessRequest } from "./ProcessRequest.tsx";

export function AuthorRequestItem({
  request,
  setAuthorRequests,
}: {
  request: AuthorRequest;
  setAuthorRequests: React.Dispatch<React.SetStateAction<AuthorRequest[]>>;
}) {
  const [user, setUser] = useState<User>();

  const { token, setMessage } = useAuthContext();
  const author = authorRequestToAuthor(request);

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
        await processAuthorRequest(request.id, approve, responseMessage, token);
        setAuthorRequests((previousState) =>
          previousState.filter((pre) => pre.id !== request.id),
        );
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
    else return;
  };
  useEffect(() => {
    const getUser = async () => {
      setUser(await fetchUser(request.userId));
    };

    getUser().then();
  }, [request.userId]);
  if (author && user)
    return (
      <div className="flex !lg:flex-col border-2 rounded-md mt-2">
        <h1 className="lg:[writing-mode:vertical-rl] text-xl font-bold text-Neutral-Strong mt-4 mx-2">
          Author Request-{request.id}
        </h1>
        <div className="flex-1 my-4 mr-4 ml-2">
          <AuthorRequestInfo
            by={user}
            author={author}
            time={request.actionTime}
          />
        </div>
        <ProcessRequest handleProcessRequest={handleProcessRequest} />
      </div>
    );
}
