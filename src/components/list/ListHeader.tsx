import { Link } from "react-router-dom";
import { ListInfo } from "../../utils/type.ts";
import { MyImage } from "../common/MyImage.tsx";

export function ListHeader({ listInfo }: { listInfo: ListInfo | undefined }) {
  if (listInfo)
    return (
      <div className="flex !md:flex-col justify-start lg:max-w-[75%] mt-4">
        <div className="h-48 w-48 mr-2 my-4 flex-shrink-0">
          <MyImage src={listInfo.imageUrl} alt={listInfo.title} />
        </div>
        <div className="my-4">
          <p className=" text-3xl font-bold text-Neutral">{listInfo.title}</p>
          <span className="text-2xl text-Neutral">
            Created by:{" "}
            <Link
              className="border-b-2 pb-1 font-semibold text-Neutral-Strong border-Neutral-Strong"
              to={`/profile/${listInfo.userId}`}
            >
              {listInfo.username}
            </Link>
          </span>
          <p className="my-4 text-xl">{listInfo.description}</p>
        </div>
      </div>
    );
  return null;
}
