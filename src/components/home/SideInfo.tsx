import {infoPara1, infoPara2} from "../../utils/data.ts";
import {Link} from "react-router-dom";

export function SideInfo() {
    return (
        <div className="flex md:w-11/12 lg:w-10/12 flex-col ">
            <div className="text-Neutral font-bold text-xl md:text-3xl my-3 xl:my-6">
                Douban EN
            </div>
            <div className="text-Neutral-Mild">
                <p>{infoPara1}</p>
                <p>{infoPara2}</p>
            </div>
            <Link
                to={"/login"}
                className="flex justify-center mt-4 pt-1 h-10 text-xl font-bold text-white  rounded-md bg-Neutral hover:bg-Neutral-Mild"
            >
                Know More
            </Link>
        </div>
    );
}