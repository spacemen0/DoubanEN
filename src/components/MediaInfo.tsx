import { Link } from "react-router-dom";
import { Media } from "../type";

export function MediaInfo({ media, home }: { media: Media; home: boolean }) {
  return (
    <div
      className={`lg:ml-8 flex-1 flex flex-col items-center !md:items-start justify-center text-xl pb-3
          ${!home && " border-b-2"} `}
    >
      <div
        className={`flex justify-between w-full pb-3 border-b-2 ${
          home &&
          (media.type === "Music"
            ? " border-Music"
            : media.type === "Movie"
            ? " border-Movie"
            : " border-Book")
        }`}
      >
        <Link
          to={`/media/${media.type.toLowerCase()}/${media.id}`}
          className="text-4xl font-semibold "
        >
          {media.title}
        </Link>
        {!home && <span className="pt-2">{`[${media.type}${media.id}]`}</span>}
      </div>
      <table className="w-full mt-3">
        <tbody>
          <tr>
            <td className="font-semibold pr-4 pb-3">Type:</td>
            <td>{media.type}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4 pb-3">Released Date:</td>
            <td>{media.releaseDate}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4 pb-3">
              {media.type === "Music"
                ? "Artist"
                : media.type === "Book"
                ? "Author"
                : "Director"}
              :
            </td>
            <td>{media.author}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4 pb-3">Genre:</td>
            <td>{media.genre}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4 pb-3">Ratings:</td>
            <td>
              <span className="text-xl lg:text-2xl font-semibold">
                {media.average}&nbsp;
              </span>
              <span className="text-lg pr-2">/5.0</span>
              from&nbsp;
              <span className="text-xl lg:text-2xl font-semibold">
                {media.ratings}&nbsp;
              </span>
              ratings
            </td>
          </tr>
          <tr>
            <td className="font-semibold pr-4">Wants:</td>
            <td>
              <span className="text-xl lg:text-2xl font-semibold">
                {media.wants}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
