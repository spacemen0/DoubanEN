import { Media } from "../../utils/type";

export function DomainSection({ media }: { media: Media }) {
  if (!media.tracks && !media.chapters && !media.casts) return <></>;

  return (
    <>
      <p className="my-4 text-2xl font-bold">
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
                <span className="inline-block w-12 px-4 font-semibold">
                  {index + 1}
                </span>{" "}
                {item}
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
                <span className="px-4 font-semibold">{index + 1}</span> {item}
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
                <p className="px-4 font-semibold">{item.character}</p>
                <p className="px-4">{item.actor}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
