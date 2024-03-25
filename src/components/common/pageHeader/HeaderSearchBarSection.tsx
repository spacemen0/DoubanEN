import {useEffect, useRef, useState} from "react";
import {DropDownSearchOptionProps, SearchOption,} from "../../../utils/type";
import {Search, X} from "lucide-react";


export default function HeaderSearchBarSection() {
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
        placeholder="Not yet implemented..."
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
