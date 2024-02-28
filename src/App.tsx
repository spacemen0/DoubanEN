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
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <Banner />
      <Featured>
        {featuredItems.map((item, index) => (
          <FeaturedItem key={index} title={item.title} />
        ))}
      </Featured>
    </div>
  );

}