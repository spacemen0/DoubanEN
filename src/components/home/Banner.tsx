import {Link} from "react-router-dom";
import {bannerText, statusInfo} from "../../utils/data.ts";
import Logo from "../../assets/Logo.jpg";

export function Banner() {
    return (
        <div className="flex flex-col">
            <div className="mt-12 flex items-center justify-center max-w-screen md:mt-16">
                <div className="flex-shrink-0 px-3 md:px-6">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-14 sm:h-20 md:h-28 lg:h-36"
                    />
                </div>
                <div className="mr-2 flex flex-col max-w-[800px]">
                    <div className="lg:text-4xl text-3xl flex !sm:flex-col font-bold text-Neutral-Mild">
                        <h1>Welcome to &nbsp;</h1>
                        <span
                            className="inline-block bg-gradient-to-r bg-clip-text text-transparent from-Music via-Movie to-Book">
              Douban EN
            </span>
                    </div>
                    <div className="mt-2 md:text-xl">
                        <p className="text-Neutral-Mild">
                            {bannerText + " "}
                            <Link to="/login" className="text-Neutral-Strong">
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
        <div className="mx-auto mt-12 max-w-screen-lg px-4">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
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
            className="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center hover:bg-gray-100">
            <p className="text-lg font-semibold text-gray-700">{count}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    );
}
