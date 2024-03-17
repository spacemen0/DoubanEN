import {Link} from "react-router-dom";
import {bannerText, statusInfo} from "../../utils/data.ts";
import Logo from "../../assets/Logo.jpg";

export function Banner() {
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-center max-w-screen md:mt-16 mt-12">
                <div className="px-3 md:px-6 flex-shrink-0">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="sm:h-20 md:h-28 lg:h-36 h-14"
                    />
                </div>
                <div className="flex flex-col max-w-[800px] mr-2">
                    <div className="lg:text-4xl text-3xl flex !sm:flex-col font-bold text-Neutral-Mild">
                        <h1>Welcome to &nbsp;</h1>
                        <span
                            className="bg-gradient-to-r from-Music via-Movie  to-Book inline-block text-transparent bg-clip-text">
              Douban EN
            </span>
                    </div>
                    <div className="mt-2 md:text-xl">
                        <p className="text-Neutral-Mild">
                            {bannerText + " "}
                            <Link to="/login" className=" text-Neutral-Strong">
                                Currently all data and images are generated randomly using
                                Faker-js.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <SiteStatus/>
        </div>
    );
}

function SiteStatus() {
    return (
        <div className="max-w-screen-lg mx-auto mt-12 px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
                <StatusItem title="Musics" count={statusInfo[0]}/>
                <StatusItem title="Movies" count={statusInfo[1]}/>
                <StatusItem title="Books" count={statusInfo[2]}/>
                <StatusItem title="Ratings" count={statusInfo[3]}/>
                <StatusItem title="Reviews" count={statusInfo[4]}/>
                <StatusItem title="Lists" count={statusInfo[5]}/>
            </div>
        </div>
    );
}

function StatusItem({title, count}: { title: string; count: string }) {
    return (
        <div
            className="flex flex-col justify-center items-center bg-white hover:bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold text-gray-700">{count}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    );
}