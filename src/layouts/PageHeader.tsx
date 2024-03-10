import { Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../slices/userSlice";
import { SearchOption, DropDownSearchOptionProps } from "../type";
import { faker } from "@faker-js/faker";
import { Link } from "react-router-dom";

export function PageHeader() {
  return (
    <div className="flex flex-col bg-white shadow-md border-b">
      <div className=" flex gap-1 lg:gap-2 justify-center items-center  h-12 md:h-14">
        <HeaderLogoSection />
        <HeaderNavBarSection forMedium={true} />
        <HeaderSearchBarSection />
        <HeaderUserSection />
      </div>
      <HeaderNavBarSection forMedium={false} />
    </div>
  );
}

function HeaderLogoSection() {
  return (
    <div className="flex gap-2 md:gap-4 items-center flex-shrink-0 transition-colors hover:bg-gray-100  h-10 px-1 md:px-2">
      <a href="/">
        <img
          src="https://e.snmc.io/3.0/img/logo/sonemic-512.png"
          title="Logo"
          className="h-10"
        />
      </a>
      <a
        className="hidden md:inline font-bold text-lg text-sky-600 h-7"
        href="/"
      >
        Douban EN
      </a>
    </div>
  );
}

function HeaderNavBarSection({ forMedium: forMedium }: { forMedium: boolean }) {
  const height: string = forMedium ? "h-10" : "h-7";
  const style: string = `flex max-w-[60px] items-center transition-colors hover:bg-gray-100 
    rounded-full flex-grow justify-center p-1 md:p-2 font-bold text-sky-600 ${height}`;
  return (
    <div
      className={`justify-around md: gap-2  max-w-[768px] lg: w - full ${
        forMedium ? "hidden md:flex" : "flex md:hidden"
      }`}
    >
      <button className={`${style}`}>Music</button>
      <button className={`${style}`}>Movie</button>
      <button className={`${style}`}>Book</button>
      <button className={`${style}`}>Game</button>
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
      <button className="h-10 absolute inset-y-0 left-0 flex items-center pt-1 pl-2 md:pl-3">
        <Search size="20" color="#4E5464" />
      </button>
      <input
        type="search"
        placeholder="Search..."
        className="rounded-full border shadow-inner my-1 py-1 pl-8 md:pl-10 pr-10 text-lg w-full outline-none"
        onClick={handleInputClick}
      />
      {isDropdownVisible && (
        <>
          <button
            className="h-10 absolute inset-y-0 right-0 flex items-center pt-1 pr-3"
            onClick={handleXButtonClick}
          >
            <X size="16" color="#4E5464" />
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
  const musicColor: string = "text-sky-700 border-b-2 font-bold border-sky-700";
  const movieColor: string =
    "text-orange-800 border-b-2 font-bold border-orange-800";
  const bookColor: string =
    "text-green-700 border-b-2 font-bold border-green-700";

  return (
    <div
      className="flex items-center justify-right transition-colors  bg-white w-screen md:w-96 h-10  text-gray-500
         border-gray-300 border-b-[0.5px] md:border absolute left-[-51px]
         md:left-3   top-[42px] md:top-[52px] md:shadow-sm shadow-gray-700"
    >
      <span className="block mx-3">Search for: </span>
      <button
        className={`px-0.5 mx-1.5  hover:text-sky-700 ${
          selectedOption === "Music" ? musicColor : ""
        }`}
        onClick={() => onOptionClick("Music")}
      >
        Music
      </button>
      <button
        className={`px-0.5 mx-1.5  hover:text-orange-800 ${
          selectedOption === "Movie" ? movieColor : ""
        }`}
        onClick={() => onOptionClick("Movie")}
      >
        Movie
      </button>
      <button
        className={`px-0.5 mx-1.5  hover:text-green-700 ${
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
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex md:gap-1.5 items-center flex-shrink-0  ">
      <div className="transition-colors hover:bg-gray-100">
        <a className="transition-colors hover:bg-gray-100" href="/">
          <img
            src={faker.image.url({ width: 64, height: 64 })}
            title="Profile Image "
            className="h-10"
          />
        </a>
      </div>
      {isLoggedIn && (
        <div className="pb-1">
          <a
            className="hidden md:inline font-bold text-lg text-sky-600 h-10"
            href="/"
          >
            {user?.name}
          </a>
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
          <Menu size="32" color="#3974C7" />
        </button>
        <DropDownMenu isOpen={isOpen} />
      </div>
    </div>
  );
}

function MenuItem({
  link,
  text,
  isLast = false,
  onClick,
}: {
  link: string;
  text: string;
  isLast?: boolean;
  onClick?: () => void;
}) {
  const borderClass = isLast ? "" : "border-b border-gray-300";

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to={link}
      className={`block px-2 py-2 text-sm ${borderClass} hover:bg-gray-100`}
      onClick={handleClick}
    >
      {text}
    </Link>
  );
}

function DropDownMenu({ isOpen }: { isOpen: boolean }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    isOpen && (
      <div className="absolute top-10 md:top-9 right-0 w-36  font-bold text-sky-600 bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        {isLoggedIn ? (
          <div>
            <MenuItem link="/profile" text="Profile" />
            <MenuItem link="/collection" text="All Collections" />
            <MenuItem link="/collection" text="Book Collection" />
            <MenuItem link="/collection" text="Music Collection" />
            <MenuItem link="/collection" text="Movie Collection" />
            <MenuItem link="/" text="Log Out" isLast={true} />
          </div>
        ) : (
          <div>
            <MenuItem link="/login" text="Log In" />
            <MenuItem link="/register" text="Register" isLast={true} />
          </div>
        )}
      </div>
    )
  );
}
