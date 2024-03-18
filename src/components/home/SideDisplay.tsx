import {Link} from "react-router-dom";
import {MyImage} from "../common/MyImage.tsx";
import {sideImages} from "../../utils/data.ts";

export function SideDisplay() {
    return (
        <div className="mt-6 flex flex-col md:mt-4 md:w-11/12 lg:w-10/12">
            <div className="mb-4">
                <Link to={`/list/${sideImages[0].listId}`}>
                    <MyImage {...sideImages[0].ImageProps} />
                </Link>
            </div>

            <div className="mb-4 flex justify-between">
                <Link to={`/list/${sideImages[1].listId}`}>
                    <MyImage {...sideImages[1].ImageProps} />
                </Link>
                <Link to={`/list/${sideImages[2].listId}`}>
                    <MyImage {...sideImages[2].ImageProps} />
                </Link>
                <Link to={`/list/${sideImages[3].listId}`}>
                    <MyImage {...sideImages[3].ImageProps} />
                </Link>
            </div>

            <div className="flex justify-between">
                <Link to={`/list/${sideImages[4].listId}`}>
                    <MyImage {...sideImages[4].ImageProps} />
                </Link>
                <Link to={`/list/${sideImages[5].listId}`}>
                    <MyImage {...sideImages[5].ImageProps} />
                </Link>
                <Link to={`/list/${sideImages[6].listId}`}>
                    <MyImage {...sideImages[6].ImageProps} />
                </Link>
            </div>
        </div>
    );
}