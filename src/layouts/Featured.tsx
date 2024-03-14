import { ReactNode, useState } from "react";
import { MyImage } from "../components/Image";
import { ListItem } from "../components/ListItem";
import { fetchCollectionItems } from "../apiService";
import { editorItems, infoPara1, infoPara2, sideImages } from "../data";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { Media } from "../type";

export function Featured({ children }: { children: ReactNode[] }) {
  return (
    <div className="flex pl-3 bg-white md:pl-6 lg:pl-12 mb-4">
      <div className="flex flex-col flex-1 lg:flex-[0.65] mr-4 md:mr-8">
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
    <Link to="/list/1">
      <div className="flex lg:hidden hover:bg-gray-100 transition-colors justify-start items-center mt-6 mb-6">
        <div className=" w-32 ">
          <img
            src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017"
            alt="Best of 2023"
          />
        </div>
        <div className="px-2 sm:px-4 md:px-8 h-auto sm:text-xl w-auto font-bold text-Neutral-Mild flex flex-col justify-center items-center">
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
        <Link to="/list/2">
          <MyImage {...sideImages[0]} />
        </Link>
      </div>

      <div className="flex justify-between mb-4">
        <Link to="/list/3">
          <MyImage {...sideImages[1]} />
        </Link>
        <Link to="/list/4">
          <MyImage {...sideImages[2]} />
        </Link>
        <Link to="/list/5">
          <MyImage {...sideImages[3]} />
        </Link>
      </div>

      <div className="flex justify-between">
        <Link to="/list/6">
          <MyImage {...sideImages[4]} />
        </Link>
        <Link to="/list/7">
          <MyImage {...sideImages[5]} />
        </Link>
        <Link to="/list/8">
          <MyImage {...sideImages[6]} />
        </Link>
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
        const items = await fetchCollectionItems(user.Id, "All");
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
    <div className="flex mt-6 lg:mt-12 flex-col md:w-11/12 lg:w-10/12 pr-4 lg:pr-8 text-Neutral-Mild">
      <div className="text-Neutral-Mild font-bold text-2xl  xl:text-3xl">
        Featured Collection
      </div>
      <div className="my-4 flex gap-10 justify-start">
        <button
          className={`border-b-2 text-xl lg:text-2xl ${
            selectedOption == "Editor" ? "text-Neutral-Mild font-bold" : ""
          }`}
          onClick={() => {
            handleOptionClick("Editor");
          }}
        >
          Editor's Selection
        </button>
        <button
          className={`border-b-2 text-xl lg:text-2xl ${
            selectedOption == "My" ? "text-Neutral-Mild font-bold" : ""
          }`}
          onClick={() => {
            handleOptionClick("My");
          }}
        >
          My Collection
        </button>
      </div>
      <div className="border-b border-gray-200  pb-1 flex lg:gap-9 md:gap-6 gap-3 text-Neutral-Mild text-xl font-semibold lg:justify-end justify-between lg:pl-0  pl-32">
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
      <div className="text-Neutral font-bold text-xl md:text-3xl my-3 xl:my-6">
        Douban EN
      </div>
      <div className="text-Neutral-Mild">
        <p>{infoPara1}</p>
        <p>{infoPara2}</p>
      </div>
      <Link
        to={"/login"}
        className="flex justify-center mt-4 pt-1 h-10 text-xl font-bold text-white  rounded-md bg-Neutral hover:bg-Neutral-Mild"
      >
        Know More
      </Link>
    </div>
  );
}
