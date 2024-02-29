import { Menu, Search } from "lucide-react"
import { useState } from "react";

export function PageHeader() {
    return (
        <div className="flex flex-col bg-white shadow-md">
            <div className=" flex gap-1 lg:gap-2 justify-center items-center  h-12 md:h-14">
                <HeaderLogoSection />
                <HeaderNavBarSection forMedium={true} />
                <HeaderSearchBarSection />
                <HeaderUserSection username="spacemen0" />
            </div >
            <HeaderNavBarSection forMedium={false} />
        </div>
    )
}

function HeaderLogoSection() {
    return (
        <div className="flex gap-4 items-center flex-shrink-0  h-10 px-2">
            <a href="/">
                <img src="https://e.snmc.io/3.0/img/logo/sonemic-512.png" title="Logo" className=" h-8" />
            </a>
            <a className=" font-bold text-lg text-sky-600 h-8" href="/">Douban EN</a>
        </div>
    )
}


function HeaderNavBarSection({ forMedium: forMedium }: { forMedium: boolean }) {
    const height: string = forMedium ? "h-10" : "h-5";
    const style: string = `flex max-w-[60px] items-center transition-colors hover:bg-gray-100 
    rounded-full flex-grow justify-center p-1 md:p-2 font-bold text-sky-500 ${height}`;
    return (
        <div className={`justify-around md: gap-2  max-w-[768px] lg: w - full ${forMedium ? "hidden md:flex" : "flex md:hidden"}`
        } >
            <button className={`${style}`}>
                Music
            </button>
            <button className={`${style}`}>
                Film
            </button>
            <button className={`${style}`}>
                Book
            </button>
            <button className={`${style}`}>
                Game
            </button>
        </div>
    )
}

function HeaderSearchBarSection() {
    return (
        <div className="relative flex flex-grow max-w-[800px]">
            <button className="h-10 absolute inset-y-0 left-0 flex items-center pt-1 pl-3">
                <Search size="20" color="#4E5464" />
            </button>
            <input
                type="search"
                placeholder="Search..."
                className="rounded-full border  shadow-inner my-1 py-1 pl-10 pr-4 text-lg w-full focus:border-sky-700 outline-none"
            />
            <DropDownSearchOption />
        </div>

    )
}


type SearchOption = 'Music' | 'Movie' | 'Book';

function DropDownSearchOption() {
    const [selectedOption, setSelectedOption] = useState<SearchOption | null>(null);

    const handleOptionClick = (option: SearchOption) => {
        setSelectedOption(option);
    };

    const musicColor: string = "sky-600";
    const movieColor: string = "orange-600";
    const bookColor: string = "green-500";

    return (
        <div className="flex items-center justify-right transition-colors border-t-0 bg-white w-72 h-8 md:w-96 md:h-12 text-gray-500 border-gray-300 border absolute top-[52px] shadow-lg ring-1 ring-black ring-opacity-5">
            <span className="block mx-3">Search for: </span>
            <button
                className={`px-1.5 py-1 hover:text-${musicColor} ${selectedOption === 'Music' ? `font-bold text-${musicColor} border-b-2 border-${musicColor}` : ''
                    }`}
                onClick={() => handleOptionClick('Music')}
            >
                Music
            </button>
            <button
                className={`px-1.5 py-1 hover:text-${movieColor} ${selectedOption === 'Movie' ? `font-bold text-${movieColor} border-b-2 border-${movieColor}` : ''
                    }`}
                onClick={() => handleOptionClick('Movie')}
            >
                Movie
            </button>
            <button
                className={`px-1.5 py-1 hover:text-${bookColor} ${selectedOption === 'Book' ? `font-bold text-${bookColor} border-b-2 border-${bookColor}` : ''
                    }`}
                onClick={() => handleOptionClick('Book')}
            >
                Book
            </button>
        </div>
    );
}


function HeaderUserSection({ username: username }: { username: string }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="flex gap-1.5 items-center flex-shrink-0">
            <a href="/">
                <img src="https://e.snmc.io/3.0/img/logo/sonemic-512.png" title="Logo" className=" h-8" />
            </a>
            <a className="hidden md:inline font-bold text-lg text-sky-600 h-8" href="/">{username}</a>
            <div className="relative">
                <button onClick={() => { setIsOpen(!isOpen); }} className="flex  relative items-center transition-colors
                 hover:bg-gray-100 rounded-full  h-10 flex-grow justify-center p-0.5">
                    <Menu size="32" color="#3974C7" />
                </button>
                <DropDownMenu isOpen={isOpen} />
            </div>

        </div>
    )
}

function MenuItem({ link, text, isLast = false }: { link: string; text: string; isLast?: boolean }) {
    const borderClass = isLast ? '' : 'border-b border-gray-300';

    return (
        <a href={link} className={`block px-2 py-2 text-sm ${borderClass} hover:bg-gray-100`}>
            {text}
        </a>
    );
}

function DropDownMenu({ isOpen }: { isOpen: boolean }) {
    return (
        isOpen && (
            <div className="absolute top-10 right-1 w-36  font-bold text-sky-600 bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div>
                    <MenuItem link="#" text="Profile" />
                    <MenuItem link="#" text="All Collections" />
                    <MenuItem link="#" text="Book Collection" />
                    <MenuItem link="#" text="Music Collection" />
                    <MenuItem link="#" text="Movie Collection" isLast={true} />
                </div>
            </div>
        )
    );
}