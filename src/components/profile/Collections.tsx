import {useEffect, useState} from "react";
import {Media} from "../../utils/type.ts";
import {useParams} from "react-router-dom";
import {fetchCollectionItems} from "../../utils/apiService.ts";
import {ListItem} from "../common/ListItem.tsx";

export function Collections() {
    const [selectedOption, setSelectedOption] = useState<
        "Music" | "Movie" | "Book"
    >("Music");
    const [myItems, setItems] = useState<Media[]>([]);
    const {id} = useParams();

    const handleOptionClick = async (option: "Music" | "Movie" | "Book") => {
        setSelectedOption(option);
        try {
            const items = await fetchCollectionItems(parseInt(id!), option);
            console.log(items);
            setItems(items);
        } catch (error) {
            console.error(`Error fetching ${option} Collection items:`, error);
        }
    };

    useEffect(() => {
        const fetchDefaultMusicCollection = async () => {
            try {
                const items = await fetchCollectionItems(parseInt(id!), "Music");
                setItems(items);
            } catch (error) {
                console.error("Error fetching default Music Collection items:", error);
            }
        };

        fetchDefaultMusicCollection().then();
    }, [id]);

    return (
        <div className="flex flex-col p-2 md:p-4 lg:p-6 bg-gray-100 text-Neutral-Mild border-t-2">
            <div className="flex gap-10 justify-start lg:text-2xl text-lg md:text-xl">
                <button
                    className={`border-b-2  ${
                        selectedOption == "Music" ? "text-Music font-bold" : ""
                    }`}
                    onClick={() => {
                        handleOptionClick("Music").then();
                    }}
                >
                    Music Collection
                </button>
                <button
                    className={`border-b-2  ${
                        selectedOption == "Movie" ? "text-Movie font-bold" : ""
                    }`}
                    onClick={() => {
                        handleOptionClick("Movie").then();
                    }}
                >
                    Movie Collection
                </button>
                <button
                    className={`border-b-2  ${
                        selectedOption == "Book" ? "text-Book font-bold" : ""
                    }`}
                    onClick={() => {
                        handleOptionClick("Book").then();
                    }}
                >
                    Book Collection
                </button>
            </div>
            <div
                className="border-b py-2 border-gray-200 text-xl font-semibold flex 3xl:pl-64 2xl:pl-48 text-Neutral-Mild justify-between pl-32">
                <span>Average</span> <span>Rated</span> <span>Wants</span>
            </div>
            {myItems.map((item) => (
                <div key={item.id} className="flex mt-4 w-full h-auto">
                    <ListItem media={item}/>
                </div>
            ))}
        </div>
    );
}