import { infoPara1, infoPara2 } from "../../utils/data";
import { Link } from "react-router-dom";

export function SideInfo() {
  return (
    <div className="flex flex-col md:w-11/12 lg:w-10/12">
      <div className="my-3 text-xl font-bold text-Neutral md:text-3xl xl:my-6">
        Douban EN
      </div>
      <div className="text-Neutral-Mild">
        <p>{infoPara1}</p>
        <p>{infoPara2}</p>
      </div>
      <Link
        to={"/login"}
        className="mt-4 flex h-10 justify-center rounded-md pt-1 text-xl font-bold text-white bg-Neutral hover:bg-Neutral-Mild"
      >
        Know More
      </Link>
    </div>
  );
}
