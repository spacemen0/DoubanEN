import {Link} from "react-router-dom";

export function FeaturedBanner() {
    return (
        <Link to="/list/1">
            <div className="mt-6 mb-6 flex items-center justify-start transition-colors hover:bg-gray-100 lg:hidden">
                <div className="w-32">
                    <img
                        src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017"
                        alt="Best of 2023"
                    />
                </div>
                <div
                    className="flex h-auto w-auto flex-col items-center justify-center px-2 font-bold text-Neutral-Mild sm:px-4 sm:text-xl md:px-8">
                    <h3>Douban EN Best of 2023</h3>
                </div>
            </div>
        </Link>
    );
}