import { Link } from "react-router-dom";
import { ListInfo } from "../../utils/type.ts";
import { MyImage } from "../common/MyImage.tsx";

export function ListHeader({ listInfo }: { listInfo: ListInfo | undefined }) {
  if (listInfo)
    return (
      <div className="flex !md:flex-col justify-start lg:max-w-[75%] mt-4">
        <div className="my-4 mr-2 h-48 w-48 flex-shrink-0">
          <MyImage src={listInfo.imageUrl} alt={listInfo.title} />
        </div>
        <div className="my-4">
          <p className="text-3xl font-bold text-Neutral">{listInfo.title}</p>
          <p className="mt-2 text-2xl text-Neutral">
            Created by:{" "}
            <Link
              className="border-b-2 pb-1 font-semibold text-Neutral border-Neutral-Strong"
              to={`/profile/${listInfo.userId}`}
            >
              {listInfo.username}
            </Link>
          </p>
          <p className="my-4 text-xl">{listInfo.description}</p>
        </div>
      </div>
    );
  return null;
}
