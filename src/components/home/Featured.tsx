import {ReactNode} from "react";
import {SideDisplay} from "./SideDisplay.tsx";
import {SideList} from "./SideList.tsx";
import {SideInfo} from "./SideInfo.tsx";
import {FeaturedBanner} from "./FeaturedBanner.tsx";

export function Featured({children}: { children: ReactNode[] }) {
    return (
        <div className="flex pl-3 bg-white md:pl-6 lg:pl-12 mb-4">
            <div className="flex flex-col flex-1 lg:flex-[0.65] mr-4">
                <FeaturedBanner/>
                {children.map((child, index) => (
                    <div key={index} className="flex mt-4 w-full h-auto justify-start">
                        {child}
                    </div>
                ))}
                <div className="lg:hidden flex flex-col mr-4">
                    <SideDisplay/>
                    <SideList></SideList>
                    <SideInfo/>
                </div>
            </div>
            <div className="flex flex-col flex-[0.35]  items-center !lg:hidden">
                <SideDisplay/>
                <SideList></SideList>
                <SideInfo/>
            </div>
        </div>
    );
}

