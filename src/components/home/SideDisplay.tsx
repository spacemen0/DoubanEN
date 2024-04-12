import { Link } from "react-router-dom";
import { MyImage } from "../common/MyImage";
import { sideLists } from "../../utils/data";

export function SideDisplay() {
  return (
    <div className="mt-6 flex flex-col md:mt-4 md:w-11/12 lg:w-10/12">
      <div className="mb-4">
        <Link to={`/list/${sideLists[0].listId}`}>
          <div className="">
            <MyImage {...sideLists[0].ImageProps} />
          </div>
        </Link>
      </div>

      <div className="mb-4 flex justify-between">
        {sideLists.slice(1, 4).map((image, index) => (
          <div className="flex-1" key={index}>
            <Link to={`/list/${image.listId}`}>
              <MyImage {...image.ImageProps} />
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        {sideLists.slice(4, 7).map((image, index) => (
          <div className="flex-1" key={index}>
            <Link to={`/list/${image.listId}`}>
              <MyImage {...image.ImageProps} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
