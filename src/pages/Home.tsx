import { FeaturedItem } from "../layouts/home/FeaturedItem";
import { featuredItems } from "../data";
import { Banner } from "../layouts/home/Banner";
import { Featured } from "../layouts/home/Featured";
import { PageHeader } from "../layouts/common/PageHeader";

export default function Home() {
  return (
    <div className="max-h-screen overflow-hidden flex flex-col">
      <PageHeader />
      <div className="overflow-y-scroll">
        <Banner />
        <div className="text-Neutral-Mild font-bold text-xl mt-8 md:mt-12 ml-3 md:ml-6 lg:ml-12 md:text-3xl">
          Featured Reviews
        </div>
        <Featured>
          {featuredItems.map((item, index) => (
            <FeaturedItem key={index} media={item.media} review={item.review} />
          ))}
        </Featured>
      </div>
    </div>
  );
}
