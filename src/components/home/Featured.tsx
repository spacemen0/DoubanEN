import { SideDisplay } from "./SideDisplay";
import { SideList } from "./SideList";
import { SideInfo } from "./SideInfo";
import { FeaturedBanner } from "./FeaturedBanner";
import { featuredItems } from "../../utils/data";
import { FeaturedItem } from "./FeaturedItem";

export function Featured() {
  return (
    <div className="mb-4 flex bg-white pl-3 md:pl-6 lg:pl-12">
      <div className="mr-4 flex flex-1 flex-col lg:flex-[0.65]">
        <FeaturedBanner />

        {featuredItems.map((item, index) => (
          <div key={index} className="mt-4 flex h-auto w-full justify-start">
            <FeaturedItem media={item.media} review={item.review} />
          </div>
        ))}

        <div className="mr-4 flex flex-col lg:hidden">
          <SideDisplay />
          <SideList></SideList>
          <SideInfo />
        </div>
      </div>
      <div className="flex flex-col flex-[0.35]  items-center !lg:hidden">
        <SideDisplay />
        <SideList></SideList>
        <SideInfo />
      </div>
    </div>
  );
}
