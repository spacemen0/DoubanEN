import {Link} from "react-router-dom";
import {MyImage} from "../common/MyImage.tsx";
import {sideImages} from "../../utils/data.ts";

export function SideDisplay() {
    return (
        <div className="mt-6 flex flex-col md:mt-4 md:w-11/12 lg:w-10/12">
            <div className="mb-4">
                <Link to="/list/2">
                    <MyImage {...sideImages[0]} />
                </Link>
            </div>

            <div className="mb-4 flex justify-between">
                <Link to="/list/3">
                    <MyImage {...sideImages[1]} />
                </Link>
                <Link to="/list/4">
                    <MyImage {...sideImages[2]} />
                </Link>
                <Link to="/list/5">
                    <MyImage {...sideImages[3]} />
                </Link>
            </div>

            <div className="flex justify-between">
                <Link to="/list/6">
                    <MyImage {...sideImages[4]} />
                </Link>
                <Link to="/list/7">
                    <MyImage {...sideImages[5]} />
                </Link>
                <Link to="/list/8">
                    <MyImage {...sideImages[6]} />
                </Link>
            </div>
        </div>
    );
}