import {ReactNode} from "react";
import {SideDisplay} from "./SideDisplay.tsx";
import {SideList} from "./SideList.tsx";
import {SideInfo} from "./SideInfo.tsx";
import {FeaturedBanner} from "./FeaturedBanner.tsx";

export function Featured({children}: { children: ReactNode[] }) {
    return (
        <div className="mb-4 flex bg-white pl-3 md:pl-6 lg:pl-12">
            <div className="mr-4 flex flex-1 flex-col lg:flex-[0.65]">
                <FeaturedBanner/>
                {children.map((child, index) => (
                    <div key={index} className="mt-4 flex h-auto w-full justify-start">
                        {child}
                    </div>
                ))}
                <div className="mr-4 flex flex-col lg:hidden">
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

