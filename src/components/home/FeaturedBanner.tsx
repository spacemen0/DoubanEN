import {Link} from "react-router-dom";
import {MyImage} from "../common/MyImage";
import {bannerImage} from "../../utils/data";


export function FeaturedBanner() {
  return (
    <Link to={`/list/${bannerImage.listId}`}>
      <div className="mt-6 mb-6 flex items-center justify-start transition-colors hover:bg-gray-100 lg:hidden">
        <div className="w-32">
          <MyImage {...bannerImage.imageProps} />
        </div>
        <div
          className="flex h-auto w-auto flex-col items-center justify-center px-2 font-bold text-Neutral-Mild sm:px-4 sm:text-xl md:px-8">
          <h3>Douban EN Best of 2023</h3>
        </div>
      </div>
    </Link>
  );
}
