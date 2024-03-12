import { generateRandomData } from "../data";
import { PageHeader } from "../layouts/PageHeader";
import { Image } from "../components/Image";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthContext();
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  });
  return (
    <div className="max-h-screen overflow-hidden flex flex-col ">
      <PageHeader />
      <div className="overflow-y-scroll">
        <div className="flex flex-col w-11/12 md:10/12 h-auto mx-auto mt-5 lg:mt-10">
          <div className="flex !sm:flex-col gap-10 justify-center items-center px-4 py-4 lg:py-8 bg-gray-100">
            <div className="w-56">
              {" "}
              <Image {...generateRandomData()} />
            </div>

            <UserInfo />
            <CurrentOn />
          </div>
        </div>
      </div>
    </div>
  );
}

function UserInfo() {
  const [showFullBio, setShowFullBio] = useState(false);
  const { user } = useAuthContext();

  const toggleBioVisibility = () => {
    setShowFullBio(!showFullBio);
  };

  const bioContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

  return (
    <div className="w-56 md:max-w-96 lg:max-w-md p-4 bg-white shadow-md rounded-md">
      <h1 className="text-xl lg:text-2xl font-semibold mb-4">{user?.name}</h1>
      <div className="mb-4">
        <p className="text-gray-600">{user?.role}</p>
        <p className="text-gray-600">Member Since: {user?.memberSince}</p>
      </div>

      <div className="border-b mb-4 pb-4">
        <p className="text-lg lg:text-xl font-semibold mb-2">Bio</p>
        <div className="text-gray-600">
          {showFullBio ? bioContent : `${bioContent.slice(0, 50)}...`}
        </div>
        {bioContent.length > 50 && (
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

function CurrentOn() {
  return (
    <div className="hidden lg:flex flex-col w-96 xl:w-[420px]  pb-6 pl-4 gap-2 items-center justify-center text-xl text-sky-600">
      <div className="flex flex-col w-full shadow-md rounded-md bg-white">
        {" "}
        <h1 className=" font-bold text-center m-2">Listening</h1>
        <div className="flex p-2 text-center">
          <div className="w-32">
            <Image {...generateRandomData()} />
          </div>

          <div className=" ml-4 flex flex-col justify-center">
            {" "}
            <h1 className="font-bold ">Very Long Album Name</h1>
            <h1 className="">Artist Name</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full shadow-md rounded-md bg-white">
        {" "}
        <h1 className=" font-bold text-center m-2">Watching</h1>
        <div className=" flex p-2 text-center">
          <div className="w-32">
            <Image {...generateRandomData()} />
          </div>
          <div className=" ml-4 flex flex-col justify-center">
            {" "}
            <h1 className="font-bold ">Very Long Movie Name</h1>
            <h1 className="">Director Name</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full shadow-md rounded-md bg-white">
        {" "}
        <h1 className="font-bold text-center m-2">Reading</h1>
        <div className="flex p-2 text-center">
          <div className="w-32">
            <Image {...generateRandomData()} />
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
