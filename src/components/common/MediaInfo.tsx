import {Link} from "react-router-dom";
import {Media} from "../../utils/type.ts";

export function MediaInfo({media, home}: { media: Media; home: boolean }) {
    return (
        <div
            className={`flex-1 flex flex-col items-center !md:items-start justify-center text-xl py-3
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
                    className="text-4xl font-semibold"
                >
                    {media.title}
                </Link>
                {!home && <span className="pt-2">{`[${media.type}${media.id}]`}</span>}
            </div>
            <table className="mt-3 w-full">
                <tbody>
                <tr>
                    <td className="pr-4 pb-3 font-semibold">Type:</td>
                    <td>{media.type}</td>
                </tr>
                <tr>
                    <td className="pr-4 pb-3 font-semibold">Released Date:</td>
                    <td>{media.releaseDate}</td>
                </tr>
                <tr>
                    <td className="pr-4 pb-3 font-semibold">
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
                    <td className="pr-4 pb-3 font-semibold">Genre:</td>
                    <td>{media.genre}</td>
                </tr>
                <tr>
                    <td className="pr-4 pb-3 font-semibold">Ratings:</td>
                    <td>
              <span className="text-xl font-semibold lg:text-2xl">
                {media.average}&nbsp;
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
                    <td className="pr-4 font-semibold">Wants:</td>
                    <td>
              <span className="text-xl font-semibold lg:text-2xl">
                {media.wants}
              </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
