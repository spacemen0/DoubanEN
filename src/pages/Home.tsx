import {FeaturedItem} from "../components/home/FeaturedItem";
import {featuredItems} from "../utils/data.ts";
import {Banner} from "../components/home/Banner";
import {Featured} from "../components/home/Featured";
import {PageHeader} from "../components/common/PageHeader";

export default function Home() {
    return (
        <div className="max-h-screen overflow-hidden flex flex-col">
            <PageHeader/>
            <div className="overflow-y-scroll">
                <Banner/>
                <div className="text-Neutral-Mild font-bold text-xl mt-8 md:mt-12 ml-3 md:ml-6 lg:ml-12 md:text-3xl">
                    Featured Reviews
                </div>
                <Featured>
                    {featuredItems.map((item, index) => (
                        <FeaturedItem key={index} media={item.media} review={item.review}/>
                    ))}
                </Featured>
            </div>
        </div>
    );
}
