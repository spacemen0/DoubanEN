import { Link } from "react-router-dom";
import { Media, User } from "../../utils/type";
import { formatLocalDateTime } from "../../utils/helper.ts";
import { apiUrl } from "../../utils/config.ts";

export function MediaRequestInfo({
  media,
  time,
  by,
}: {
  media: Media;
  time: string;
  by: User;
}) {
  return (
    <div className="flex items-center !md:flex-col !md:items-start justify-center text-xl p-2 border rounded-md">
      <div className="h-44 w-44 self-start mr-2 mt-2">
        <img src={apiUrl + media.imageUrl} alt={media.title} />
      </div>
      <div className="flex flex-col !md:mt-2">
        <div className="flex justify-start w-full pb-3 border-b-2 text-xl font-semibold text-Neutral items-center">
          <h1 className="mr-4">
            Media Title: <span className="font-bold">{media.title}</span>
          </h1>
          <h2 className="text-xl">
            Requested by:{" "}
            <Link
              className="hover:text-Neutral-Strong underline"
              to={`/profile/${by.id}`}
            >
              {by.username}
            </Link>{" "}
            at {formatLocalDateTime(time)}
          </h2>
        </div>
        <table className="mt-3 w-full">
          <tbody>
            <tr>
              <td className="pr-4 font-semibold pb-1.5 lg:pb-3">Type:</td>
              <td className="pb-1.5 lg:pb-3">{media.type}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold pb-1.5 lg:pb-3">Released:</td>
              <td className="pb-1.5 lg:pb-3">{media.releaseDate}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold pb-1.5 lg:pb-3">
                {media.type === "Music"
                  ? "Artist"
                  : media.type === "Book"
                    ? "Author"
                    : "Director"}
                :
              </td>

              <td className="pb-1.5 hover:text-Neutral-Strong lg:pb-3">
                <Link to={`/author/${media.author}`}> {media.author_name}</Link>
              </td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold pb-1.5 lg:pb-3">Genre:</td>
              <td className="pb-1.5 lg:pb-3">{media.genre}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
