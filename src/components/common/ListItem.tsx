import {Link} from "react-router-dom";
import {Media} from "../../utils/type.ts";
import {MyImage} from "./MyImage.tsx";

export function ListItem({media}: { media: Media }) {
    return (
        <div className="flex w-full">
            <div className="mt-2 mr-2 h-full max-h-32 w-full max-w-32 md:mr-4 lg:mr-6">
                <MyImage
                    src={media.image}
                    alt={media.title}
                    href={`/${media.type}/${media.id}`}
                />
            </div>
            <div className="flex w-full flex-col justify-between border-b border-gray-200 pb-1 align-top">
                <Link
                    to={`/media/${media.type.toLowerCase()}/${media.id}`}
                    className={
                        " text-xl font-bold " +
                        (media.type === "Music"
                            ? "text-Music"
                            : media.type === "Movie"
                                ? "text-Movie"
                                : "text-Book")
                    }
                >
                    {media.title}
                </Link>
                <Link
                    to={`/media/${media.type.toLowerCase()}/${media.id}`}
                    className={
                        "text-xl " +
                        (media.type === "Music"
                            ? "text-Music"
                            : media.type === "Movie"
                                ? "text-Movie"
                                : "text-Book")
                    }
                >
                    {media.author}
                </Link>
                <p
                    className={
                        "text-xl " +
                        (media.type === "Music"
                            ? "text-Music"
                            : media.type === "Movie"
                                ? "text-Movie"
                                : "text-Book")
                    }
                >
                    {media.releaseDate}
                </p>
                <div className="flex justify-between xl:pr-2 3xl:pr-4">
                    <p
                        className={
                            "text-xl font-semibold " +
                            (media.type === "Music"
                                ? "text-Music"
                                : media.type === "Movie"
                                    ? "text-Movie"
                                    : "text-Book")
                        }
                    >
                        {media.type}
                    </p>

                    <p
                        className={
                            "text-xl " +
                            (media.type === "Music"
                                ? "text-Music"
                                : media.type === "Movie"
                                    ? "text-Movie"
                                    : "text-Book")
                        }
                    >
                        {media.genre}
                    </p>
                </div>

                <div className="flex items-center justify-between pl-0 text-xl xl:pr-2 2xl:pl-10 3xl:pr-4 3xl:pl-28">
                    <p
                        className={
                            "text-xl " +
                            (media.type === "Music"
                                ? "text-Music"
                                : media.type === "Movie"
                                    ? "text-Movie"
                                    : "text-Book")
                        }
                    >
                        {media.average}
                    </p>
                    <p
                        className={
                            media.type === "Music"
                                ? "text-Music"
                                : media.type === "Movie"
                                    ? "text-Movie"
                                    : "text-Book"
                        }
                    >
                        {media.ratings}
                    </p>
                    <p
                        className={
                            media.type === "Music"
                                ? "text-Music"
                                : media.type === "Movie"
                                    ? "text-Movie"
                                    : "text-Book"
                        }
                    >
                        {media.wants}
                    </p>
                </div>
            </div>
        </div>
    );
}
