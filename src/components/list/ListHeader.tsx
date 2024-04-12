import { Link } from "react-router-dom";
import { ListInfo } from "../../utils/type.ts";

export function ListHeader({ listInfo }: { listInfo: ListInfo | undefined }) {
  return (
    <>
      <p className="my-4 text-3xl font-bold text-Neutral">{listInfo?.title}</p>
      <span className="text-2xl text-Neutral">
        Created by:{" "}
        <Link
          className="border-b-2 pb-1 font-semibold text-Neutral-Strong border-Neutral-Strong"
          to={`/profile/${listInfo?.userId}`}
        >
          {listInfo?.username}
        </Link>
      </span>
      <p className="my-4 text-xl">{listInfo?.description}</p>
    </>
  );
}
