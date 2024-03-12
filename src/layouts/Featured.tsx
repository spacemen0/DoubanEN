import { ReactNode, useState } from "react";
import { Image } from "../components/Image";
import { ListItem } from "../components/ListItem";
import { fetchCollectionItems } from "../apiService";
import { editorItems, infoPara1, infoPara2, sideImages } from "../data";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { Media } from "../type";

export function Featured({ children }: { children: ReactNode[] }) {
  return (
    <div className="flex pl-3 bg-white md:pl-6 lg:pl-12 mb-4">
      <div className="flex flex-col flex-1 lg:flex-[0.65] mr-4 md:mr-8 ">
        <FeaturedBanner />
        {children.map((child, index) => (
          <div key={index} className="flex mt-4 w-full h-auto justify-start">
            {child}
          </div>
        ))}
        <div className="lg:hidden flex flex-col mr-4">
          <SideDisplay />
          <SideList></SideList>
          <SideInfo />
        </div>
      </div>
      <div className="flex flex-col flex-[0.35]  items-center !lg:hidden">
        <SideDisplay />
        <SideList></SideList>
        <SideInfo />
      </div>
    </div>
  );
}

function FeaturedBanner() {
  return (
    <Link to="/">
      <div className="flex lg:hidden hover:bg-gray-100 transition-colors justify-start items-center mt-6 mb-6">
        <div className=" w-32 ">
          <img
            src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017"
            alt="Best of 2023"
          />
        </div>
        <div className="px-2 sm:px-4 md:px-8 h-auto sm:text-xl w-auto font-bold text-Music flex flex-col justify-center items-center">
          <h3>Douban EN Best of 2023</h3>
        </div>
      </div>
    </Link>
  );
}

function SideDisplay() {
  return (
    <div className="flex flex-col md:w-11/12 lg:w-10/12 md:mt-4 mt-6">
      <div className="mb-4">
        <Image {...sideImages[0]} />
      </div>

      <div className="flex justify-between mb-4">
        <Image {...sideImages[1]} />
        <Image {...sideImages[2]} />
        <Image {...sideImages[3]} />
      </div>

      <div className="flex justify-between">
        <Image {...sideImages[4]} />
        <Image {...sideImages[5]} />
        <Image {...sideImages[6]} />
      </div>
    </div>
  );
}

function SideList() {
  const [selectedOption, setSelectedOption] = useState<"Editor" | "My">(
    "Editor"
  );
  const [myItems, setMyItems] = useState<Media[]>([]);
  const { isLoggedIn, user } = useAuthContext();
  const handleOptionClick = async (option: "Editor" | "My") => {
    setSelectedOption(option);
    if (option === "My" && user) {
      try {
        const items = await fetchCollectionItems(user.ID, "All");
        setMyItems(items);
      } catch (error) {
        console.error("Error fetching My Collection items:", error);
      }
    }
  };

  const EditorList = editorItems.map((item) => (
    <ListItem media={item} key={item.id} />
  ));
  const MyList = myItems.map((item) => <ListItem media={item} key={item.id} />);

  return (
    <div className="flex mt-6 lg:mt-12 flex-col md:w-11/12 lg:w-10/12 pr-4 lg:pr-8 text-gray-600">
      <div className="text-Music font-bold text-2xl  xl:text-3xl">
        Featured Collection
      </div>
      <div className="my-4 flex gap-10 justify-start">
        <button
          className={`border-b-2 text-xl lg:text-2xl ${
            selectedOption == "Editor" ? "text-Music font-bold" : ""
          }`}
          onClick={() => {
            handleOptionClick("Editor");
          }}
        >
          Editor's Selection
        </button>
        <button
          className={`border-b-2 text-xl lg:text-2xl ${
            selectedOption == "My" ? "text-Music font-bold" : ""
          }`}
          onClick={() => {
            handleOptionClick("My");
          }}
        >
          My Collection
        </button>
      </div>
      <div className="border-b border-gray-200  pb-1 flex lg:gap-9 md:gap-6 gap-3 text-gray-600 text-xl font-semibold lg:justify-end justify-between lg:pl-0  pl-32">
        <span>Average</span> <span>Rated</span> <span>Wants</span>
      </div>
      {selectedOption == "Editor" &&
        EditorList.map((listItem, index) => (
          <div key={index} className="flex mt-4 w-full h-auto">
            {listItem}
          </div>
        ))}
      {selectedOption == "My" &&
        isLoggedIn &&
        MyList.map((listItem, index) => (
          <div key={index} className="flex mt-4 w-full h-auto">
            {listItem}
          </div>
        ))}
      {selectedOption == "My" && !isLoggedIn && (
        <p className="text-xl mt-2">
          Create a new account or sign in to keep track of your favorites
        </p>
      )}
    </div>
  );
}

function SideInfo() {
  return (
    <div className="flex md:w-11/12 lg:w-10/12 flex-col ">
      <div className="text-Music font-bold text-xl md:text-3xl my-4 xl:my-8">
        Douban EN
      </div>
      <div className="text-gray-500">
        <p>{infoPara1}</p>
        <p>{infoPara2}</p>
      </div>
      <Link
        to={"/"}
        className="flex justify-center mt-4 pt-1 h-10 text-xl font-bold text-white bg-blue-500 rounded-md hover:bg-blue-400"
      >
        Know More
      </Link>
    </div>
  );
}
