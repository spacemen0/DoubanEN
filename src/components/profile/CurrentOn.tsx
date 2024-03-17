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
            className="w-96 flex-col items-center justify-center gap-2 pb-6 text-lg text-gray-600 md:w-[420px] md:pl-4">
            <div className="mb-2 flex w-full flex-col rounded-md bg-white shadow-md">
                {" "}
                <h1 className="m-2 text-center font-bold">Listening</h1>
                <div className="flex p-2 text-center">
                    <div className="w-32">
                        <MyImage
                            src={currentOn[0].image}
                            alt={currentOn[0].title}
                            href={`/media/${currentOn[0].type}/${currentOn[0].id}`}
                        />
                    </div>

                    <div className="ml-4 flex flex-col justify-center">
                        {" "}
                        <h1 className="font-bold">Very Long Album Name</h1>
                        <h1 className="">Artist Name</h1>
                    </div>
                </div>
            </div>
            <div className="mb-2 flex w-full flex-col rounded-md bg-white shadow-md">
                {" "}
                <h1 className="m-2 text-center font-bold">Watching</h1>
                <div className="flex p-2 text-center">
                    <div className="w-32">
                        <MyImage
                            src={currentOn[1].image}
                            alt={currentOn[1].title}
                            href={`/media/${currentOn[0].type}/${currentOn[1].id}`}
                        />
                    </div>
                    <div className="ml-4 flex flex-col justify-center">
                        {" "}
                        <h1 className="font-bold">Very Long Movie Name</h1>
                        <h1 className="">Director Name</h1>
                    </div>
                </div>
            </div>
            <div className="mb-2 flex w-full flex-col rounded-md bg-white shadow-md">
                {" "}
                <h1 className="m-2 text-center font-bold">Reading</h1>
                <div className="flex p-2 text-center">
                    <div className="w-32">
                        <MyImage
                            src={currentOn[2].image}
                            alt={currentOn[2].title}
                            href={`/media/${currentOn[0].type}/${currentOn[2].id}`}
                        />
                    </div>
                    <div className="ml-4 flex flex-col justify-center">
                        {" "}
                        <h1 className="font-bold">Very Long Book Name</h1>
                        <h1 className="">Author Name</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

