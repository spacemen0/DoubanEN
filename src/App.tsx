import { FeaturedItem } from "./components/FeaturedItem";
import { Banner } from "./layouts/Banner";
import { Featured } from "./layouts/Featured";
import { PageHeader } from "./layouts/PageHeader";

export default function App() {
  const featuredItems = [
    { title: 'Item 1' },
    { title: 'Item 2' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    { title: 'Item 3' },
    // Add more items as needed
  ];
  return (
    <div className="max-h-screen overflow-hidden flex flex-col">
      <PageHeader />
      <div className="overflow-y-scroll">
        <Banner />
        <div className="text-sky-700 font-bold text-xl mt-8 md:mt-12 ml-3 md:ml-6 lg:ml-12 md:text-3xl">Featured Reviews</div>
        <Featured>
          {featuredItems.map((item, index) => (
            <FeaturedItem key={index} title={item.title} />
          ))}
        </Featured>
      </div>
    </div>
  );

}