import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.jpg";

export default function HeaderLogoSection() {
  return (
    <div className="flex h-16 flex-shrink-0 items-center gap-2 px-1 transition-colors md:gap-4 md:px-2">
      <Link to="/">
        <img src={Logo} alt="Logo" className="h-10" />
      </Link>
      <Link
        className="hidden h-10 rounded-lg text-lg font-bold text-Neutral-Mild p-1.5 hover:bg-gray-100 md:inline"
        to="/"
      >
        Douban EN
      </Link>
    </div>
  );
}
