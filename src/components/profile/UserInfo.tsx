import {useState} from "react";
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