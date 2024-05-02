import { MediaRequest } from "../../utils/type.ts";
import { formatLocalDateTime } from "../../utils/helper.ts";
import { Link } from "react-router-dom";

export function UserMediaRequestItem({
  mediaRequest,
}: {
  mediaRequest: MediaRequest;
}) {
  return (
    <li className="flex !md:flex-col justify-start items-center p-2 border rounded-md mt-2 text-Neutral text-lg">
      <h2 className="font-semibold">
        {mediaRequest.type + ": " + mediaRequest.title + " by "}
        <span>{mediaRequest.author_name}</span>
      </h2>
      <p className="font-medium md:ml-4">
        Requested at: {formatLocalDateTime(mediaRequest.actionTime)}
      </p>
      <p className="font-medium md:ml-4">
        Status:{" "}
        {mediaRequest.status === "Approved" ? (
          <Link
            className="hover:text-Neutral-Strong underline"
            to={`/media/${mediaRequest.resourceId}`}
          >
            {mediaRequest.status}
          </Link>
        ) : (
          mediaRequest.status
        )}
      </p>
    </li>
  );
}
