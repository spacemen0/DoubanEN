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
        <div className="mt-6 flex flex-col pr-4 text-Neutral-Mild md:w-11/12 lg:mt-12 lg:w-10/12 lg:pr-8">
            <div className="text-2xl font-bold text-Neutral-Mild xl:text-3xl">
                Featured Collection
            </div>
            <div className="my-4 flex justify-start gap-10">
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
                className="flex justify-between gap-3 border-b border-gray-200 pb-1 pl-32 text-xl font-semibold text-Neutral-Mild md:gap-6 lg:justify-end lg:gap-9 lg:pl-0">
                <span>Average</span> <span>Rated</span> <span>Wants</span>
            </div>
            {selectedOption == "Editor" &&
                EditorList.map((listItem, index) => (
                    <div key={index} className="mt-4 flex h-auto w-full">
                        {listItem}
                    </div>
                ))}
            {selectedOption == "My" &&
                isLoggedIn &&
                MyList.map((listItem, index) => (
                    <div key={index} className="mt-4 flex h-auto w-full">
                        {listItem}
                    </div>
                ))}
            {selectedOption == "My" && !isLoggedIn && (
                <p className="mt-2 text-xl">
                    Create a new account or sign in to keep track of your favorites
                </p>
            )}
        </div>
    );
}