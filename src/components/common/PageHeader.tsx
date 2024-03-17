import {Menu, Search, X} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {DropDownSearchOptionProps, SearchOption} from "../../utils/type.ts";
import {faker} from "@faker-js/faker";
import {Link, useNavigate} from "react-router-dom";
import {useAuthContext} from "../../contexts/AuthContext.ts";
import {MenuItem} from "./MenuItem.tsx";
import Logo from "../../assets/Logo.jpg";

export function PageHeader() {
    return (
        <div className="flex flex-col border-b bg-white shadow-md">
            <div className="flex h-12 items-center justify-center gap-1 md:h-14 lg:gap-2">
                <HeaderLogoSection/>
                <HeaderNavBarSection forMedium={true}/>
                <HeaderSearchBarSection/>
                <HeaderUserSection/>
            </div>
            <HeaderNavBarSection forMedium={false}/>
        </div>
    );
}

function HeaderLogoSection() {
    return (
        <div className="flex h-16 flex-shrink-0 items-center gap-2 px-1 transition-colors md:gap-4 md:px-2">
            <Link to="/">
                <img src={Logo} alt="Logo" className="h-10"/>
            </Link>
            <Link
                className="hidden h-10 rounded-lg text-lg font-bold text-Neutral-Mild p-1.5 hover:bg-gray-100 md:inline"
                to="/"
            >
                Douban EN
            </Link>
        </div>
    );
}

function HeaderNavBarSection({forMedium: forMedium}: { forMedium: boolean }) {
    const navigate = useNavigate();
    const height: string = forMedium ? "h-10" : "h-7";
    const style: string = `flex max-w-[60px] items-center transition-colors hover:bg-gray-100 
    rounded-lg flex-grow justify-center p-1 md:p-2 font-bold ${height} `;
    return (
        <div
            className={`justify-around md: gap-2 text-lg  max-w-[768px] lg: w - full ${
                forMedium ? "hidden md:flex" : "flex md:hidden"
            }`}
        >
            <button
                onClick={() => {
                    navigate("/media/music");
                }}
                className={`${style}text-Music`}
            >
                Music
            </button>
            <button
                onClick={() => {
                    navigate("/media/movie");
                }}
                className={`${style}text-Movie`}
            >
                Movie
            </button>
            <button
                onClick={() => {
                    navigate("/media/book");
                }}
                className={`${style}text-Book`}
            >
                Book
            </button>
        </div>
    );
}

function HeaderSearchBarSection() {
    const [selectedOption, setSelectedOption] = useState<SearchOption>("Music");
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const searchBarRef = useRef<HTMLDivElement | null>(null);

    const handleInputClick = () => {
        setDropdownVisibility(true);
    };

    const handleXButtonClick = () => {
        setDropdownVisibility(false);
    };

    const handleOptionClick = (option: SearchOption) => {
        setSelectedOption(option);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchBarRef.current &&
                event.target instanceof Node &&
                !searchBarRef.current.contains(event.target)
            ) {
                setDropdownVisibility(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [searchBarRef]);

    return (
        <div className="relative flex flex-grow max-w-[800px]" ref={searchBarRef}>
            <button className="absolute inset-y-0 left-0 flex h-10 items-center pt-1 pl-2 md:pl-3">
                <Search size="20" color="#4E5464"/>
            </button>
            <input
                type="search"
                placeholder="Search..."
                className="my-1 w-full rounded-full border py-1 pr-10 pl-8 text-lg text-gray-600 shadow-inner outline-none md:pl-10"
                onClick={handleInputClick}
            />
            {isDropdownVisible && (
                <>
                    <button
                        className="absolute inset-y-0 right-0 flex h-10 items-center pt-1 pr-3"
                        onClick={handleXButtonClick}
                    >
                        <X size="16" color="#4E5464"/>
                    </button>
                </>
            )}

            {isDropdownVisible && (
                <DropDownSearchOption
                    selectedOption={selectedOption}
                    onOptionClick={handleOptionClick}
                />
            )}
        </div>
    );
}

function DropDownSearchOption({
                                  selectedOption,
                                  onOptionClick,
                              }: DropDownSearchOptionProps) {
    const musicColor: string = "text-Music border-b-2 font-bold border-Music";
    const movieColor: string = "text-Movie border-b-2 font-bold border-Movie";
    const bookColor: string = "text-Book border-b-2 font-bold border-Book";

    return (
        <div
            className="flex items-center justify-right transition-colors  bg-white w-screen md:w-96 h-10  text-Neutral-Mild
         border-gray-300 border-b-[0.5px] md:border absolute left-[-51px]
         md:left-3   top-[42px] md:top-[52px] md:shadow-sm shadow-gray-700"
        >
            <span className="mx-3 block">Search for: </span>
            <button
                className={`px-0.5 mx-1.5  hover:text-Music ${
                    selectedOption === "Music" ? musicColor : ""
                }`}
                onClick={() => onOptionClick("Music")}
            >
                Music
            </button>
            <button
                className={`px-0.5 mx-1.5  hover:text-Movie ${
                    selectedOption === "Movie" ? movieColor : ""
                }`}
                onClick={() => onOptionClick("Movie")}
            >
                Movie
            </button>
            <button
                className={`px-0.5 mx-1.5  hover:text-Book ${
                    selectedOption === "Book" ? bookColor : ""
                }`}
                onClick={() => onOptionClick("Book")}
            >
                Book
            </button>
        </div>
    );
}

function HeaderUserSection() {
    const {isLoggedIn, user} = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex flex-shrink-0 items-center md:gap-1.5">
            {isLoggedIn && (
                <div className="transition-colors hover:bg-gray-100">
                    <Link className="transition-colors hover:bg-gray-100" to={"/profile"}>
                        <img
                            src={faker.image.url({width: 64, height: 64})}
                            alt="Profile Image "
                            className="h-10"
                        />
                    </Link>
                </div>
            )}

            {isLoggedIn && (
                <div className="pb-1">
                    <Link
                        className="hidden h-10 text-lg font-bold text-Neutral-Mild md:inline"
                        to={"/profile"}
                    >
                        {user?.name}
                    </Link>
                </div>
            )}

            <div className="relative">
                <button
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                    className="flex  relative items-center transition-colors
                 hover:bg-gray-100 rounded-full  h-10 flex-grow justify-center p-0.5"
                >
                    <Menu size="32" color="rgb(75 85 99)"/>
                </button>
                <DropDownMenu isOpen={isOpen}/>
            </div>
        </div>
    );
}

function DropDownMenu({isOpen}: { isOpen: boolean }) {
    const {isLoggedIn, logout, token, user} = useAuthContext();

    const handleLogout = async () => {
        if (token) await logout(token);
    };
    return (
        isOpen && (
            <div
                className="absolute top-10 right-0 w-36 bg-white font-bold shadow-lg ring-1 ring-opacity-5 text-Neutral ring-Neutral-Strong md:top-9">
                {isLoggedIn ? (
                    <div>
                        <MenuItem link={`/profile/${user!.Id}`} text="Profile"/>
                        <MenuItem link="/collection" text="All Collections"/>
                        <MenuItem link="/collection" text="Book Collection"/>
                        <MenuItem link="/collection" text="Music Collection"/>
                        <MenuItem link="/collection" text="Movie Collection"/>
                        <MenuItem
                            link="/"
                            text="Log Out"
                            onClick={handleLogout}
                            isLast={true}
                        />
                    </div>
                ) : (
                    <div>
                        <MenuItem link="/login" text="Log In"/>
                        <MenuItem link="/register" text="Register" isLast={true}/>
                    </div>
                )}
            </div>
        )
    );
}
