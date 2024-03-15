import {Media} from "../../utils/type.ts";

export function AdditionalInfo({media}: { media: Media }) {
    if (!media.tracks && !media.chapters && !media.casts) return <></>;

    return (
        <>
            <p className="font-bold text-2xl my-4">
                {media.type === "Music"
                    ? "Track Listing"
                    : media.type === "Book"
                        ? "Chapter Listing"
                        : "Cast"}
            </p>
            <div className="flex flex-col rounded-md border text-xl">
                {media.type === "Music" && media.tracks && (
                    <>
                        {media.tracks.map((item, index) => (
                            <p
                                key={index}
                                className={`border-b py-2 ${index % 2 === 0 && "bg-gray-100"}`}
                            >
                                <span className="font-semibold px-4">{index + 1}</span> {item}
                            </p>
                        ))}
                    </>
                )}
                {media.type === "Book" && media.chapters && (
                    <>
                        {media.chapters.map((item, index) => (
                            <p
                                key={index}
                                className={`border-b py-2 ${index % 2 === 0 && "bg-gray-100"}`}
                            >
                                <span className="font-semibold px-4">{index + 1}</span> {item}
                            </p>
                        ))}
                    </>
                )}
                {media.type === "Movie" && media.casts && (
                    <>
                        {media.casts.map((item, index) => (
                            <div
                                key={index}
                                className={`border-b py-2 ${index % 2 === 0 && "bg-gray-100"}`}
                            >
                                <p className="font-semibold px-4">{item.character}</p>
                                <p className="px-4">{item.actor}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}