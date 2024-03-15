import {useState} from "react";
import {Media} from "../../utils/type.ts";
import {useAuthContext} from "../../contexts/AuthContext.ts";
import {fetchCollectionItems} from "../../utils/apiService.ts";
import {editorItems} from "../../utils/data.ts";
import {ListItem} from "../common/ListItem.tsx";

export function SideList() {
    const [selectedOption, setSelectedOption] = useState<"Editor" | "My">(
        "Editor"
    );
    const [myItems, setMyItems] = useState<Media[]>([]);
    const {isLoggedIn, user, setMessage} = useAuthContext();
    const handleOptionClick = async (option: "Editor" | "My") => {
        setSelectedOption(option);
        if (option === "My" && user) {
            try {
                const items = await fetchCollectionItems(user.Id, "All");
                setMyItems(items);
            } catch (error) {
                setMessage("Error fetching your collection items");
            }
        }
    };

    const EditorList = editorItems.map((item) => (
        <ListItem media={item} key={item.id}/>
    ));
    const MyList = myItems.map((item) => <ListItem media={item} key={item.id}/>);

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
                    onClick={async () => {
                        await handleOptionClick("Editor");
                    }}
                >
                    Editor's Selection
                </button>
                <button
                    className={`border-b-2 text-xl lg:text-2xl ${
                        selectedOption == "My" ? "text-Neutral-Mild font-bold" : ""
                    }`}
                    onClick={async () => {
                        await handleOptionClick("My");
                    }}
                >
                    My Collection
                </button>
            </div>
            <div
                className="border-b border-gray-200  pb-1 flex lg:gap-9 md:gap-6 gap-3 text-Neutral-Mild text-xl font-semibold lg:justify-end justify-between lg:pl-0  pl-32">
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