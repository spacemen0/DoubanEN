import { Link } from "react-router-dom";
import { bannerText, statusInfo } from "../data";

export function Banner() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center max-w-screen md:mt-16 mt-12">
        <div className="px-3 md:px-6 flex-shrink-0">
          <img
            src="https://e.snmc.io/3.0/img/logo/sonemic-512.png"
            title="Logo"
            className="sm:h-20 md:h-28 lg:h-36 h-14"
          />
        </div>
        <div className="flex flex-col max-w-[800px] mr-2">
          <div className="lg:text-4xl text-3xl flex !sm:flex-col font-bold text-gray-600">
            <h1>Welcome to &nbsp;</h1>
            <span className="bg-gradient-to-r from-blue-900  to-sky-400 inline-block text-transparent bg-clip-text">
              Douban EN
            </span>
          </div>
          <div className="mt-2 md:text-xl">
            <p>
              {bannerText}
              <Link to="/profile" className=" text-Music">
                Learn about some of the ways you can use Douban EN for music
                discovery.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <SiteStatus />
    </div>
  );
}

function SiteStatus() {
  return (
    <div className="max-w-screen-lg mx-auto mt-12 px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
        <StatusItem title="Musics" count={statusInfo[0]} />
        <StatusItem title="Movies" count={statusInfo[1]} />
        <StatusItem title="Books" count={statusInfo[2]} />
        <StatusItem title="Ratings" count={statusInfo[3]} />
        <StatusItem title="Reviews" count={statusInfo[4]} />
        <StatusItem title="Lists" count={statusInfo[5]} />
      </div>
    </div>
  );
}

function StatusItem({ title, count }: { title: string; count: string }) {
  return (
    <div className="flex flex-col justify-center items-center bg-white hover:bg-gray-100 p-4 rounded-lg text-center">
      <p className="text-lg font-semibold text-gray-700">{count}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
}
