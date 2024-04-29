import { Banner } from "../components/home/Banner";
import { Featured } from "../components/home/Featured";
import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { Footer } from "../components/common/Footer.tsx";

export default function Home() {
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll flex flex-col justify-between h-screen">
        <Banner />
        <div className="mt-8 ml-5 text-xl font-bold text-Neutral-Mild md:mt-12 md:ml-7 md:text-3xl lg:ml-12">
          Featured Reviews
        </div>
        <Featured></Featured>
        <Footer />
      </div>
    </div>
  );
}
