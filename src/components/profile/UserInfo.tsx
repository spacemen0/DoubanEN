import {useEffect, useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext.ts";
import {MyImage} from "../common/MyImage.tsx";
import {User} from "../../utils/type.ts";
import {getUser} from "../../utils/apiService.ts";

export function UserInfo({id}:{id:number}) {
    const [showFullBio, setShowFullBio] = useState(false);
    const [user,setUser] = useState<User>()
    const {setMessage} = useAuthContext()

    useEffect(() => {
        const fetchUser = async (id:number)=>{
            try {
                const userData = await getUser(id)
                setUser(userData)
            } catch (e) {
                setMessage("Error fetching user info")
            }
        }
        fetchUser(id).then()
    }, [id, setMessage]);
    const toggleBioVisibility = () => {
        setShowFullBio(!showFullBio);
    };

    return (
        <div className="w-96 rounded-md bg-white p-4 shadow-md md:max-w-sm lg:max-w-md xl:max-w-lg">
            {user&&<div className="mb-4 flex items-center">
                <div className="mr-4 !md:max-w-48">
                    <MyImage
                        src={user.profileImage}
                        alt={"Profile Image of " + user.name}
                        href={`/profile/${user.Id}`}
                    />
                </div>
                <div>
                    <h1 className="mb-1 text-xl font-semibold lg:text-2xl">
                        {user.name}
                    </h1>
                    <p className="text-gray-600">{user?.role}</p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Member Since:</span>{" "}
                        {user?.memberSince}
                    </p>
                </div>
            </div>}

            {user&&<div className="mb-4 border-b pb-4">
                <p className="mb-2 text-lg font-semibold lg:text-xl">Bio</p>
                <div className="text-gray-600">
                    {showFullBio ? user.bio : `${user.bio.slice(0, 100)}...`}
                </div>
                {user.bio.length > 100 && (
                    <button
                        onClick={toggleBioVisibility}
                        className="pt-2 font-semibold text-blue-500 hover:underline focus:outline-none"
                    >
                        {showFullBio ? "Hide Bio" : "Show Full Bio"}
                    </button>
                )}
            </div>}
        </div>
    );
}