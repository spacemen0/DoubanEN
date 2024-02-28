export function PageHeader() {
    return (
        <div className="sticky top-0 flex gap-5 lg:gap-10 justify-between items-center bg-cyan-300 h-20">
            <HeaderLogoSection />
            <HeaderNavBarSection />
        </div >
    )
}

export function HeaderLogoSection() {
    return (
        <div className="flex gap-4 items-center flex-shrink-0 bg-cyan-300 h-10 pl-2">
            <img src="https://e.snmc.io/3.0/img/logo/sonemic-32.png" title="Logo" className=" h-8" />
            <a className=" font-bold text-lg text-sky-400 h-8" href="/">DoubanEN</a>
        </div>
    )
}

export function HeaderNavBarSection() {
    return (
        <div className=" md:gap-2 flex max-w-[500px] lg:w-full overflow-hidden">
            <button className="flex items-center transition-colors hover:bg-gray-100 rounded-full  h-10 flex-grow justify-center p-1.5 md:p-2.5 font-bold text-sky-400">
                New Music
            </button>
            <button className="flex items-center transition-colors hover:bg-gray-100 rounded-full  h-10 flex-grow justify-center p-1.5 md:p-2.5 font-bold text-sky-400">
                New Film
            </button>
            <button className="flex items-center transition-colors hover:bg-gray-100 rounded-full  h-10 flex-grow justify-center p-1.5 md:p-2.5 font-bold text-sky-400">
                Explore
            </button>
            <button className="flex items-center transition-colors hover:bg-gray-100 rounded-full  h-10 flex-grow justify-center p-1.5 md:p-2.5 font-bold text-sky-400">
                Placeholder
            </button>
        </div>
    )
}