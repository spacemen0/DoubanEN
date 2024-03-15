import {useEffect, useState} from "react";
import {Media} from "../../utils/type.ts";
import {fetchCurrentOn} from "../../utils/apiService.ts";
import {useAuthContext} from "../../contexts/AuthContext.ts";
import {MyImage} from "../common/MyImage.tsx";

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

