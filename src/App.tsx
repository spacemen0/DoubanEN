import { FeaturedItem } from "./components/FeaturedItem";
import { Banner } from "./layouts/Banner";
import { Featured } from "./layouts/Featured";
import { PageHeader } from "./layouts/PageHeader";

export default function App() {
  return (
    <div className="max-h-screen overflow-hidden flex flex-col">
      <PageHeader />
      <div className="overflow-y-scroll">
        <Banner />
        <div className="text-sky-700 font-bold text-xl mt-8 md:mt-12 ml-3 md:ml-6 lg:ml-12 md:text-3xl">Featured Reviews</div>
        <Featured>
          {featuredItems.map((item, index) => (
            <FeaturedItem key={index} image={item.image} music={item.music} review={item.review} />
          ))}
        </Featured>
      </div>
    </div>
  );

}