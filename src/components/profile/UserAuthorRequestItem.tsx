import { AuthorRequest } from "../../utils/type.ts";
import { formatLocalDateTime } from "../../utils/helper.ts";
import { Link } from "react-router-dom";

export function UserAuthorRequestItem({
  authorRequest,
}: {
  authorRequest: AuthorRequest;
}) {
  return (
    <li className="flex !md:flex-col justify-start items-center p-2 border rounded-md mt-2 text-Neutral text-lg">
      <h2 className="font-semibold">
        {authorRequest.type + ": " + authorRequest.name}
      </h2>
      <p className="font-medium md:ml-4">
        Requested at: {formatLocalDateTime(authorRequest.actionTime)}
      </p>
      <p className="font-medium md:ml-4">
        Status:{" "}
        {authorRequest.status === "Approved" ? (
          <Link
            className="hover:text-Neutral-Strong underline"
            to={`/author/${authorRequest.resourceId}`}
          >
            {authorRequest.status}
          </Link>
        ) : (
          authorRequest.status
        )}
      </p>
    </li>
  );
}
