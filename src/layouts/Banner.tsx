import { Link } from "react-router-dom";

export function Banner() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center max-w-screen md:mt-16 mt-12">
        <div className="px-3 md:px-6 flex-shrink-0">
          {" "}
          <Link to="/">
            <img
              src="https://e.snmc.io/3.0/img/logo/sonemic-512.png"
              title="Logo"
              className="sm:h-20 md:h-28 lg:h-36 h-14"
            />
          </Link>
        </div>
        <div className="flex flex-col max-w-[800px] mr-2">
          <div className="lg:text-4xl text-3xl flex !sm:flex-col font-bold text-gray-600">
            <h1>Welcome to &nbsp;</h1>
            <span className="bg-gradient-to-r from-blue-900  to-sky-400 inline-block text-transparent bg-clip-text">
              {" "}
              Douban EN
            </span>
          </div>
          <div className="mt-2 md:text-xl">
            <p>
              Douban EN is one of the largest music databases and communities
              online, which you can use in endless ways to discover new music.{" "}
              <Link to="/" className=" text-sky-800">
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
        <StatusItem title="Artists" count="1,717,584" />
        <StatusItem title="Releases" count="6,017,201" />
        <StatusItem title="Labels" count="135,764" />
        <StatusItem title="Ratings" count="129,452,924" />
        <StatusItem title="Reviews" count="3,138,489" />
        <StatusItem title="Lists" count="734,976" />
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
