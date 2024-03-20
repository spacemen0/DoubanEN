import {useAuthContext} from "../../../contexts/AuthContext.ts";
import {useState} from "react";
import {Link} from "react-router-dom";
import {faker} from "@faker-js/faker";
import {Menu} from "lucide-react";
import {MenuItem} from "../MenuItem.tsx";

export default function HeaderUserSection() {
    const {isLoggedIn, user} = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex flex-shrink-0 items-center md:gap-1.5">
            {isLoggedIn && (
                <div className="transition-colors hover:bg-gray-100">
                    <Link className="transition-colors hover:bg-gray-100" to={"/profile"}>
                        <img
                            src={faker.image.url({width: 64, height: 64})}
                            alt="Profile Image "
                            className="h-10"
                        />
                    </Link>
                </div>
            )}

            {isLoggedIn && (
                <div className="pb-1">
                    <Link
                        className="hidden h-10 text-lg font-bold text-Neutral-Mild md:inline"
                        to={"/profile"}
                    >
                        {user?.username}
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
                    <Menu size="32" color="rgb(75 85 99)"/>
                </button>
                <DropDownMenu isOpen={isOpen}/>
            </div>
        </div>
    );
}

function DropDownMenu({isOpen}: { isOpen: boolean }) {
    const {isLoggedIn, logout, token, user} = useAuthContext();

    const handleLogout = async () => {
        if (token) await logout(token);
    };
    return (
        isOpen && (
            <div
                className="absolute top-10 right-0 w-36 bg-white font-bold shadow-lg ring-1 ring-opacity-5 text-Neutral ring-Neutral-Strong md:top-9">
                {isLoggedIn ? (
                    <div>
                        <MenuItem link={`/profile/${user!.id}`} text="Profile"/>
                        <MenuItem link="/collection" text="All Collections"/>
                        <MenuItem link="/collection" text="Book Collection"/>
                        <MenuItem link="/collection" text="Music Collection"/>
                        <MenuItem link="/collection" text="Movie Collection"/>
                        <MenuItem
                            link="/"
                            text="Log Out"
                            onClick={handleLogout}
                            isLast={true}
                        />
                    </div>
                ) : (
                    <div>
                        <MenuItem link="/login" text="Log In"/>
                        <MenuItem link="/register" text="Register" isLast={true}/>
                    </div>
                )}
            </div>
        )
    );
}