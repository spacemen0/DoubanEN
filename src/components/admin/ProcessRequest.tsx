import { useState } from "react";

export function ProcessRequest({
  handleProcessRequest,
}: {
  handleProcessRequest: (
    approve: boolean,
    responseMessage: string,
  ) => Promise<void>;
}) {
  const [responseMessage, setResponseMessage] = useState("");
  return (
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
            handleProcessRequest(true, responseMessage).then();
          }}
          className="mr-2 flex w-20 justify-center rounded-md p-2  text-white
                   transition-colors duration-300 bg-Neutral-Strong hover:bg-Neutral focus:bg-Neutral-Strong
                   focus:ring-Neutral-Strong focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Approve
        </button>
        <button
          onClick={() => {
            handleProcessRequest(false, responseMessage).then();
          }}
          className="flex w-20 justify-center rounded-md p-2  text-white
                   transition-colors duration-300 bg-Neutral-Strong hover:bg-Neutral focus:bg-Neutral-Strong
                   focus:ring-Neutral-Strong focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
