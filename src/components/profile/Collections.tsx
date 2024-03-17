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
        <div className="flex flex-col border-t-2 bg-gray-100 p-2 text-Neutral-Mild md:p-4 lg:p-6">
            <div className="flex justify-start gap-10 text-lg md:text-xl lg:text-2xl">
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
                className="flex justify-between border-b border-gray-200 py-2 pl-32 text-xl font-semibold text-Neutral-Mild 2xl:pl-48 3xl:pl-64">
                <span>Average</span> <span>Rated</span> <span>Wants</span>
            </div>
            {myItems.map((item) => (
                <div key={item.id} className="mt-4 flex h-auto w-full">
                    <ListItem media={item}/>
                </div>
            ))}
        </div>
    );
}