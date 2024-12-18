import React, { useEffect, useState } from "react";
import { FullImage } from "../common/FullImage.tsx";
import { User } from "../../utils/type";

import { fetchUser } from "../../apiUtils/userApiUtil.ts";
import { Link } from "react-router-dom";
import { apiUrl } from "../../utils/config.ts";
import { useAuthStore } from "../../contexts/AuthStore.ts";

export function InfoCard({
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
  const setMessage = useAuthStore((state) => state.setMessage);

  useEffect(() => {
    const fetchUserData = async (id: number) => {
      try {
        const userData = await fetchUser(id);
        setUser(userData);
        setUsername(userData.username);
      } catch (e) {
        const error = e as Error;
        if (error.message === "Not Exist") setExist(false);
        else setMessage(error.message);
      }
    };
    fetchUserData(id).then();
  }, [id, setExist, setMessage, setUsername]);
  const toggleBioVisibility = () => {
    setShowFullBio(!showFullBio);
  };

  return (
    <div className="w-96 rounded-md bg-white p-4 shadow-md md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg">
      {user && (
        <div className="mb-4 flex items-center md:flex-col lg:flex-row">
          <div className="mr-4 !md:max-w-32">
            <Link to={`/profile/${user.id}`}>
              <FullImage
                src={apiUrl + user.profileImageUrl}
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
          <button className="mb-2 border-b-2 py-1 text-xl font-semibold text-Neutral border-Neutral hover:text-Neutral-Strong">
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
                : `${
                    user.bio.length > 100
                      ? user.bio.slice(0, 100) + "..."
                      : user.bio
                  }`
              : "This user hasn't written anything on their bio."}
          </div>
          {user.bio && user.bio.length > 100 && (
            <button
              onClick={toggleBioVisibility}
              className="pt-2 font-semibold text-Neutral hover:underline focus:outline-none"
            >
              {showFullBio ? "Hide Bio" : "Show Full Bio"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
