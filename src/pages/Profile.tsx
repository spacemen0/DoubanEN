import {PageHeader} from "../components/common/PageHeader";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../contexts/AuthContext";
import {CurrentOn} from "../components/profile/CurrentOn.tsx";
import {UserInfo} from "../components/profile/UserInfo.tsx";
import {Collections} from "../components/profile/Collections.tsx";

export default function Profile() {
    const navigate = useNavigate();
    const {isLoggedIn} = useAuthContext();
    useEffect(() => {
        if (!isLoggedIn) navigate("/login");
    });
    return (
        <div className="flex max-h-screen flex-col overflow-hidden">
            <PageHeader/>
            <div className="overflow-y-scroll">
                <div className="mx-auto flex h-auto w-full flex-col md:10/12">
                    <div
                        className="flex !md:flex-col gap-5 lg:gap-10 justify-center items-center px-4 py-4 lg:py-8 bg-gray-100">
                        <UserInfo/>
                        <CurrentOn/>
                    </div>
                    <Collections/>
                </div>
            </div>
        </div>
    );
}

