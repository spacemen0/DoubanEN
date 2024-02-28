import { FeaturedItem } from "./components/FeaturedItem";
import { Banner } from "./layouts/Banner";
import { Featured } from "./layouts/Featured";
import { PageHeader } from "./layouts/PageHeader";

export default function App() {
  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <Banner />
      <Featured><FeaturedItem></FeaturedItem></Featured>
    </div>
  )
}