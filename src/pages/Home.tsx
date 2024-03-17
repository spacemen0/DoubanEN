import {FeaturedItem} from "../components/home/FeaturedItem";
import {featuredItems} from "../utils/data.ts";
import {Banner} from "../components/home/Banner";
import {Featured} from "../components/home/Featured";
import {PageHeader} from "../components/common/PageHeader";

export default function Home() {
    return (
        <div className="flex max-h-screen flex-col overflow-hidden">
            <PageHeader/>
            <div className="overflow-y-scroll">
                <Banner/>
                <div className="mt-8 ml-3 text-xl font-bold text-Neutral-Mild md:mt-12 md:ml-6 md:text-3xl lg:ml-12">
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
