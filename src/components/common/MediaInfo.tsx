import { Link } from "react-router-dom";
import { Media } from "../../utils/type";

export function MediaInfo({ media, home }: { media: Media; home: boolean }) {
  return (
    <div
      className={`flex-1 flex flex-col items-center !md:items-start justify-center text-xl pb-2
          ${!home && " border-b-2"} `}
    >
      <div
        className={`flex justify-between w-full pb-3 border-b-2 ${
          home && "border-Neutral-Mild"
        }`}
      >
        <Link to={`/media/${media.id}`} className="text-4xl font-semibold">
          {media.title}
        </Link>
        {!home && <span className="pt-2">{`[${media.type}${media.id}]`}</span>}
      </div>
      <table className="mt-3 w-full">
        <tbody>
          <tr>
            <td className="pr-4 font-semibold pb-1.5 lg:pb-3">Type:</td>
            <td className="pb-1.5 lg:pb-3">{media.type}</td>
          </tr>
          <tr>
            <td className="pr-4 font-semibold pb-1.5 lg:pb-3">
              Released Date:
            </td>
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
            <td className="pb-1.5 lg:pb-3">{media.author}</td>
          </tr>
          <tr>
            <td className="pr-4 font-semibold pb-1.5 lg:pb-3">Genre:</td>
            <td className="pb-1.5 lg:pb-3">{media.genre}</td>
          </tr>
          <tr>
            <td className="pr-4 font-semibold pb-1.5 lg:pb-3">Ratings:</td>
            <td className="pb-1.5 lg:pb-3">
              <span className="text-xl font-semibold lg:text-2xl">
                {media.average.toFixed(2)}&nbsp;
              </span>
              <span className="pr-2 text-lg">/5.0</span>
              from&nbsp;
              <span className="text-xl font-semibold lg:text-2xl">
                {media.ratings}&nbsp;
              </span>
              ratings
            </td>
          </tr>
          <tr>
            <td className="pr-4 font-semibold pb-1.5 lg:pb-3">Wishlists:</td>
            <td>
              <span className="text-xl font-semibold pb-1.5 lg:pb-3 lg:text-2xl">
                {media.wants}
              </span>
            </td>
          </tr>
          <tr>
            <td className="pr-4 font-semibold">
              {" "}
              {media.type === "Music"
                ? "Listening"
                : media.type === "Book"
                  ? "Reading"
                  : "Watching"}
              :
            </td>
            <td>
              <span className="text-xl font-semibold lg:text-2xl">
                {media.doings}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
