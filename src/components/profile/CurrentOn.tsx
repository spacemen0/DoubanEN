import {useEffect, useState} from "react";
import {Media} from "../../utils/type.ts";
import {useParams} from "react-router-dom";
import {fetchCollectionItems, fetchCurrentOn} from "../../utils/apiService.ts";
import {ListItem} from "../common/ListItem.tsx";
import {useAuthContext} from "../../contexts/AuthContext.ts";
import {MyImage} from "../common/MyImage.tsx";

export function UserInfo() {
    const [showFullBio, setShowFullBio] = useState(false);
    const {user} = useAuthContext();

    const toggleBioVisibility = () => {
        setShowFullBio(!showFullBio);
    };

    return (
        <div className="w-96 md:max-w-sm lg:max-w-md xl:max-w-lg p-4 bg-white shadow-md rounded-md">
            <div className="flex items-center mb-4">
                <div className="mr-4 !md:max-w-48">
                    <MyImage
                        src={user!.profileImage}
                        alt={"Profile Image of " + user!.name}
                        href={`/profile/${user!.Id}`}
                    />
                </div>
                <div>
                    <h1 className="text-xl lg:text-2xl font-semibold mb-1">
                        {user?.name}
                    </h1>
                    <p className="text-gray-600">{user?.role}</p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Member Since:</span>{" "}
                        {user?.memberSince}
                    </p>
                </div>
            </div>

            <div className="border-b mb-4 pb-4">
                <p className="text-lg lg:text-xl font-semibold mb-2">Bio</p>
                <div className="text-gray-600">
                    {showFullBio ? user!.bio : `${user!.bio.slice(0, 100)}...`}
                </div>
                {user!.bio.length > 100 && (
                    <button
                        onClick={toggleBioVisibility}
                        className="text-blue-500 font-semibold pt-2 hover:underline focus:outline-none"
                    >
                        {showFullBio ? "Hide Bio" : "Show Full Bio"}
                    </button>
                )}
            </div>
        </div>
    );
}

export function CurrentOn() {
    const {user, setMessage} = useAuthContext();
    const [currentOn, SetCurrentOn] = useState<Media[]>();
    useEffect(() => {
        const getCurrentOn = async () => {
            try {
                const items = await fetchCurrentOn(user!.Id);
                SetCurrentOn(items);
            } catch (error) {
                setMessage("Error fetching default Music Collection items:");
            }
        };
        getCurrentOn().then();
    }, [setMessage, user]);
    if (!currentOn) {
        return <></>;
    }
    return (
        <div
            className="flex-col w-96 md:w-[420px]  pb-6 md:pl-4 gap-2 items-center justify-center text-lg text-gray-600">
            <div className="flex flex-col mb-2 w-full shadow-md rounded-md bg-white">
                {" "}
                <h1 className=" font-bold text-center m-2">Listening</h1>
                <div className="flex p-2 text-center">
                    <div className="w-32">
                        <MyImage
                            src={currentOn[0].image}
                            alt={currentOn[0].title}
                            href={`/media/${currentOn[0].type}/${currentOn[0].id}`}
                        />
                    </div>

                    <div className=" ml-4 flex flex-col justify-center">
                        {" "}
                        <h1 className="font-bold ">Very Long Album Name</h1>
                        <h1 className="">Artist Name</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-2 w-full shadow-md rounded-md bg-white">
                {" "}
                <h1 className=" font-bold text-center m-2">Watching</h1>
                <div className=" flex p-2 text-center">
                    <div className="w-32">
                        <MyImage
                            src={currentOn[1].image}
                            alt={currentOn[1].title}
                            href={`/media/${currentOn[0].type}/${currentOn[1].id}`}
                        />
                    </div>
                    <div className=" ml-4 flex flex-col justify-center">
                        {" "}
                        <h1 className="font-bold ">Very Long Movie Name</h1>
                        <h1 className="">Director Name</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-2 w-full shadow-md rounded-md bg-white">
                {" "}
                <h1 className="font-bold text-center m-2">Reading</h1>
                <div className="flex p-2 text-center">
                    <div className="w-32">
                        <MyImage
                            src={currentOn[2].image}
                            alt={currentOn[2].title}
                            href={`/media/${currentOn[0].type}/${currentOn[2].id}`}
                        />
                    </div>
                    <div className=" ml-4 flex flex-col justify-center">
                        {" "}
                        <h1 className="font-bold ">Very Long Book Name</h1>
                        <h1 className="">Author Name</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

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