export function Banner() {
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-center max-w-screen h-40 md:h-28 md:mt-12 mt-8">
                <div className="px-1.5 md:px-3 flex-shrink-0">            <a href="/">
                    <img src="https://e.snmc.io/3.0/img/logo/sonemic-512.png" title="Logo" className="md:h-28 h-14" />
                </a></div>
                <div className="flex flex-col max-w-[800px] mr-2">
                    <div className="md:text-2xl text-xl font-bold text-gray-600">
                        <h1>Welcome to <span className="bg-gradient-to-r from-blue-900  to-sky-400 inline-block text-transparent bg-clip-text">Douban EN</span>
                        </h1>
                    </div>
                    <div className="mt-2"><p>Douban EN is one of the largest music databases and communities online, which you can use in endless ways to discover new music. <a href="/" className=" text-sky-800">Learn about some of the ways you can use Douban EN for music discovery.</a></p></div>
                </div>
            </div>
            <SiteStatus />
        </div>
    )
}


function SiteStatus() {
    return (
        <div className="max-w-screen-lg mx-auto mt-8 px-4">
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
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold text-gray-700">{count}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    );
}