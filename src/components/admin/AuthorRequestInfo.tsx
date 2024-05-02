import { Link } from "react-router-dom";
import { formatLocalDateTime } from "../../utils/helper.ts";
import { Author, User } from "../../utils/type.ts";

export function AuthorRequestInfo({
  author,
  time,
  by,
}: {
  author: Author;
  time: string;
  by: User;
}) {
  return (
    <div className="flex items-center !md:flex-col !md:items-start justify-center text-xl p-2 border rounded-md">
      <div className="flex flex-col !md:mt-2">
        <div className="flex justify-start w-full pb-3 border-b-2 text-xl font-semibold text-Neutral items-center">
          <h1 className="mr-4">
            Author name: <span className="font-bold">{author.name}</span>
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
        <h2>Author type: {author.type}</h2>
        <div className="flex flex-col !md:mt-2">
          <h2 className="text-xl"></h2>
          <ul className="my-4">
            <h2 className="my-2 text-xl font-medium text-Neutral">Genres: </h2>
            {author.genres.length > 0 &&
              author.genres.map((genre) => (
                <li
                  className="ml-6 list-decimal text-lg font-medium text-Neutral"
                  key={genre}
                >
                  {genre}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
