import { AuthorRequest, User } from "../../utils/type.ts";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext.ts";
import { processAuthorRequest } from "../../apiUtils/userRequestApiUtil.ts";
import { fetchUser } from "../../apiUtils/userApiUtil.ts";
import { AuthorRequestInfo } from "./AuthorRequestInfo.tsx";
import { authorRequestToAuthor } from "../../utils/helper.ts";

export function AuthorRequestItem({
  request,
  setAuthorRequests,
}: {
  request: AuthorRequest;
  setAuthorRequests: React.Dispatch<React.SetStateAction<AuthorRequest[]>>;
}) {
  const [user, setUser] = useState<User>();
  const [responseMessage, setResponseMessage] = useState("");
  const { token, setMessage } = useAuthContext();
  const author = authorRequestToAuthor(request);

  const handleProcessRequest = async (approve: boolean) => {
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
        <div className="flex-[0.6] flex-col mx-2 border rounded-md my-4 p-2">
          <label
            htmlFor="message"
            className="block text-2xl my-4 font-semibold text-Neutral"
          >
            Response with message:{" "}
          </label>
          <input
            type="text"
            id="message"
            name="message"
            value={responseMessage}
            onChange={(e) => {
              setResponseMessage(e.target.value);
            }}
            className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          />
          <div className="flex mt-2">
            <button
              onClick={() => {
                handleProcessRequest(true).then();
              }}
              className="mr-2 flex w-20 justify-center rounded-md p-2  text-white
                   transition-colors duration-300 bg-Neutral-Strong hover:bg-Neutral focus:bg-Neutral-Strong
                   focus:ring-Neutral-Strong focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Approve
            </button>
            <button
              onClick={() => {
                handleProcessRequest(false).then();
              }}
              className="flex w-20 justify-center rounded-md p-2  text-white
                   transition-colors duration-300 bg-Neutral-Strong hover:bg-Neutral focus:bg-Neutral-Strong
                   focus:ring-Neutral-Strong focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    );
}
