import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { MyImage } from "../common/MyImage";
import { User } from "../../utils/type";

import { fetchUser } from "../../utils/services/userService.ts";
import { Link } from "react-router-dom";

export function UserInfo({
  id,
  setExist,
  setUsername,
}: {
  id: number;
  setExist: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [showFullBio, setShowFullBio] = useState(false);
  const [user, setUser] = useState<User>();
  const { setMessage } = useAuthContext();

  useEffect(() => {
    const fetchUserData = async (id: number) => {
      try {
        const userData = await fetchUser(id);
        setUser(userData);
        setUsername(userData.username);
      } catch (e) {
        const error = e as Error;
        if (error.message === "Not Exist") setExist(false);
        else setMessage("Error fetching user info");
      }
    };
    fetchUserData(id).then();
  }, [id, setExist, setMessage, setUsername]);
  const toggleBioVisibility = () => {
    setShowFullBio(!showFullBio);
  };

  return (
    <div className="w-96 rounded-md bg-white p-4 shadow-md md:max-w-sm lg:max-w-md xl:max-w-lg">
      {user && (
        <div className="mb-4 flex items-center">
          <div className="mr-4 !md:max-w-32">
            <Link to={`/profile/${user.id}`}>
              <MyImage
                src={user.profileImage}
                alt={"Profile Image of " + user.username}
              />
            </Link>
          </div>
          <div>
            <h1 className="mb-1 text-xl font-semibold lg:text-2xl">
              {user.username}
            </h1>
            <p className="text-Neutral">{user?.role}</p>
            <p className="text-Neutral">
              <span className="font-semibold">Member Since:</span> {user?.date}
            </p>
          </div>
        </div>
      )}
      <div>
        <Link to={`/lists/${user?.id}`}>
          <button className="text-xl text-Neutral font-semibold py-1 mb-2 border-b-2 border-Neutral hover:text-Neutral-Strong">
            Browse {user?.username}'s lists
          </button>
        </Link>
      </div>
      {user && (
        <div className="mb-4 border-b pb-4">
          <p className="mb-2 text-lg font-semibold lg:text-xl">Bio</p>
          <div className="text-Neutral">
            {user.bio
              ? showFullBio
                ? user.bio
                : `${user.bio.length > 100 ? user.bio.slice(0, 100) + "..." : user.bio}`
              : "This user hasn't written anything on their bio."}
          </div>
          {user.bio && user.bio.length > 100 && (
            <button
              onClick={toggleBioVisibility}
              className="pt-2 font-semibold text-blue-500 hover:underline focus:outline-none"
            >
              {showFullBio ? "Hide Bio" : "Show Full Bio"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
