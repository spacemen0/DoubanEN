import {Link} from "react-router-dom";

export function FeaturedBanner() {
    return (
        <Link to="/list/1">
            <div className="flex lg:hidden hover:bg-gray-100 transition-colors justify-start items-center mt-6 mb-6">
                <div className=" w-32 ">
                    <img
                        src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017"
                        alt="Best of 2023"
                    />
                </div>
                <div
                    className="px-2 sm:px-4 md:px-8 h-auto sm:text-xl w-auto font-bold text-Neutral-Mild flex flex-col justify-center items-center">
                    <h3>Douban EN Best of 2023</h3>
                </div>
            </div>
        </Link>
    );
}