export function Banner() {
    return (
        <div className="flex items-center justify-center max-w-screen h-40 md:h-28 md:mt-10 mt-5">
            <div className="pr-3 flex-shrink-0">            <a href="/">
                <img src="https://e.snmc.io/3.0/img/logo/sonemic-512.png" title="Logo" className="md:h-28 h-14" />
            </a></div>

            <div className="flex flex-col max-w-[800px]">
                <div className="text-2xl font-bold text-gray-600"><h1>Welcome to <span className="bg-gradient-to-r from-blue-900  to-sky-400 inline-block text-transparent bg-clip-text">Douban EN</span></h1></div>

                <div className="mt-2"><p>RYM is one of the largest music databases and communities online, which you can use in endless ways to discover new music. <a href="/" className=" text-sky-800">Learn about some of the ways you can use RYM for music discovery.</a></p></div>
            </div>


        </div>
    )
}
