import { ReactNode, useState } from "react";
import { Image } from "../components/Image";
import { ListItem } from "../components/ListItem";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../slices/userSlice";
import { fetchMyCollectionItems } from "../apiService";
import { editorItems, sideImages } from "../data";
import { ListItemProps } from "../type";

export function Featured({ children }: { children: ReactNode[] }) {
  return (
    <div className="flex pl-3 bg-white md:pl-6 lg:pl-12 mb-4">
      <div className="flex flex-col flex-1 lg:flex-[0.65] mr-4 md:mr-8 ">
        <FeaturedBanner />
        {children.map((child, index) => (
          <div key={index} className="flex mt-4 w-full h-auto ">
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
    <a href="#">
      <div className="flex lg:hidden hover:bg-gray-100 transition-colors justify-start items-center mt-6 mb-6">
        <div className=" w-32 ">
          <img
            src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017"
            alt="Best of 2023"
          />
        </div>
        <div className="px-2 sm:px-4 md:px-8 h-auto sm:text-xl w-auto font-bold text-sky-700 flex flex-col justify-center items-center">
          <h3>Douban EN Best of 2023</h3>
        </div>
      </div>
    </a>
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
  const [myItems, setMyItems] = useState<ListItemProps[]>([]);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const handleOptionClick = async (option: "Editor" | "My") => {
    setSelectedOption(option);
    if (option === "My" && user) {
      try {
        const items = await fetchMyCollectionItems(user.ID);
        setMyItems(items);
      } catch (error) {
        console.error("Error fetching My Collection items:", error);
        // Handle the error appropriately, e.g., show a message to the user
      }
    }
  };

  const EditorList = editorItems.map((item) => (
    <ListItem {...item} key={item.music.id} />
  ));
  const MyList = myItems.map((item) => (
    <ListItem {...item} key={item.music.id} />
  ));

  return (
    <div className="flex mt-6 lg:mt-12 flex-col md:w-11/12 lg:w-10/12 pr-4 lg:pr-8 text-gray-600">
      <div className="text-sky-700 font-bold text-xl md:text-3xl">
        Featured Music
      </div>
      <div className="my-4 flex gap-10 justify-start">
        <button
          className={`border-b-2 text-2xl ${
            selectedOption == "Editor" ? "text-sky-900 font-bold" : ""
          }`}
          onClick={() => {
            handleOptionClick("Editor");
          }}
        >
          Editor's Selection
        </button>
        <button
          className={`border-b-2 text-2xl ${
            selectedOption == "My" ? "text-sky-900 font-bold" : ""
          }`}
          onClick={() => {
            handleOptionClick("My");
          }}
        >
          My Collection
        </button>
      </div>
      <div className="border-b border-gray-200 text-lg pb-1 flex lg:gap-9 md:gap-6 gap-3 text-gray-800 lg:justify-end justify-between lg:pl-0  pl-32">
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
        <p>Create a new account or sign in to keep track of your favorites</p>
      )}
    </div>
  );
}

function SideInfo() {
  return (
    <div className="flex md:w-11/12 lg:w-10/12 flex-col ">
      <div className="text-sky-700 font-bold text-xl md:text-3xl my-4 xl:my-8">
        Douban EN
      </div>
      <div className="text-gray-500">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          doloremque est. Maxime repudiandae odit ad, ratione aliquid doloribus
          sint quas similique natus laudantium adipisci recusandae eum
          consequatur ullam unde repellat.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          doloremque est. Maxime repudiandae odit ad, ratione aliquid doloribus
          sint quas similique natus laudantium adipisci recusandae eum
          consequatur ullam unde repellat.
        </p>
      </div>
      <button className="mt-4 h-10 text-xl font-bold text-white bg-blue-500 rounded-md hover:bg-blue-400">
        Know More
      </button>
    </div>
  );
}
