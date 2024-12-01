import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { MenuItem } from "./MenuItem.tsx";
import { FullImage } from "../common/FullImage.tsx";
import { apiUrl } from "../../utils/config.ts";
import { useAuthStore } from "../../contexts/AuthStore.ts";

export default function HeaderUserSection() {
  const user = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-shrink-0 items-center md:gap-1.5">
      {user && (
        <div className="h-10 w-10 transition-colors hover:bg-gray-100">
          <Link
            className="transition-colors hover:bg-gray-100"
            to={`/profile/${user.id}`}
          >
            <FullImage
              src={apiUrl + user.profileImageUrl}
              alt={user.username}
            />
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
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setMessage = useAuthStore((state) => state.setMessage);
  const currentUrl = window.location.href;
  let route = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
  if (!isNaN(parseInt(route))) {
    const lastSlashIndex = currentUrl.lastIndexOf("/");
    const secondLastSlashIndex = currentUrl.lastIndexOf(
      "/",
      lastSlashIndex - 1
    );
    route = currentUrl.substring(secondLastSlashIndex + 1);
  }
  const handleLogout = async () => {
    if (token) {
      await logout();
    }
  };
  return (
    isOpen && (
      <div className="absolute top-10 right-0 w-36 bg-white font-bold shadow-lg ring-1 ring-opacity-5 text-Neutral ring-Neutral-Strong md:top-9">
        {user ? (
          <div>
            <MenuItem
              link={`/profile/${user.id}`}
              onClick={() => {
                setIsOpen(false);
              }}
              text="Profile"
            />
            <MenuItem
              link={`/lists/${user.id}`}
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
              link="/collection?type=All"
              onClick={() => {
                setIsOpen(false);
              }}
              text="All Collections"
            />
            <MenuItem
              link="/collection?type=Book"
              onClick={() => {
                setIsOpen(false);
              }}
              text="Book Collection"
            />
            <MenuItem
              link="/collection?type=Music"
              onClick={() => {
                setIsOpen(false);
              }}
              text="Music Collection"
            />
            <MenuItem
              link="/collection?type=Movie"
              onClick={() => {
                setIsOpen(false);
              }}
              text="Movie Collection"
            />
            {user.role === "Admin" && (
              <MenuItem
                link="/admin"
                onClick={() => {
                  setIsOpen(false);
                }}
                text="Admin Page"
              />
            )}
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
            <MenuItem
              link={
                location.pathname === "login"
                  ? "login"
                  : `/login?redirect=${route}`
              }
              text="Log In"
            />
            <MenuItem link="/register" text="Register" isLast={true} />
          </div>
        )}
      </div>
    )
  );
}
