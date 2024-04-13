import { useAuthContext } from "../../../contexts/AuthContext";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { MenuItem } from "./MenuItem.tsx";
import { MyImage } from "../MyImage.tsx";
import { apiUrl } from "../../../utils/config.ts";

export default function HeaderUserSection() {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-shrink-0 items-center md:gap-1.5">
      {user && (
        <div className="h-10 w-10 transition-colors hover:bg-gray-100">
          <Link
            className="transition-colors hover:bg-gray-100"
            to={`/profile/${user.id}`}
          >
            <MyImage src={apiUrl + user.profileImageUrl} alt={user.username} />
          </Link>
        </div>
      )}

      {user && (
        <div className="pb-1">
          <Link
            className="hidden h-10 text-lg font-bold text-Neutral-Mild md:inline"
            to={`/profile/${user.id}`}
          >
            {user.username}
          </Link>
        </div>
      )}

      <div className="relative">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex  relative items-center transition-colors
                 hover:bg-gray-100 rounded-full  h-10 flex-grow justify-center p-0.5"
        >
          <Menu size="32" color="rgb(75 85 99)" />
        </button>
        <DropDownMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}

function DropDownMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isLoggedIn, logout, token, user, setMessage } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (token) {
      await logout(token);
      navigate("/");
    }
  };
  return (
    isOpen && (
      <div className="absolute top-10 right-0 w-36 bg-white font-bold shadow-lg ring-1 ring-opacity-5 text-Neutral ring-Neutral-Strong md:top-9">
        {isLoggedIn ? (
          <div>
            <MenuItem
              link={`/profile/${user!.id}`}
              onClick={() => {
                setIsOpen(false);
              }}
              text="Profile"
            />
            <MenuItem
              link={`/lists/${user!.id}`}
              onClick={() => {
                setIsOpen(false);
              }}
              text="My Lists"
            />
            <MenuItem
              link="/edit"
              onClick={() => {
                setIsOpen(false);
              }}
              text="Edit Profile"
            />
            <MenuItem
              link="/collection/all"
              onClick={() => {
                setIsOpen(false);
              }}
              text="All Collections"
            />
            <MenuItem
              link="/collection/book"
              onClick={() => {
                setIsOpen(false);
              }}
              text="Book Collection"
            />
            <MenuItem
              link="/collection/music"
              onClick={() => {
                setIsOpen(false);
              }}
              text="Music Collection"
            />
            <MenuItem
              link="/collection/movie"
              onClick={() => {
                setIsOpen(false);
              }}
              text="Movie Collection"
            />
            <MenuItem
              text="Log Out"
              onClick={async () => {
                try {
                  setIsOpen(false);
                  await handleLogout();
                } catch (e) {
                  const error = e as Error;
                  if (error.message === "Logout error")
                    setMessage("Logout request error");
                  else setMessage("Error processing logout request");
                }
              }}
              isLast={true}
            />
          </div>
        ) : (
          <div>
            <MenuItem link="/login" text="Log In" />
            <MenuItem link="/register" text="Register" isLast={true} />
          </div>
        )}
      </div>
    )
  );
}
