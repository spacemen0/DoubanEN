import Logo from "../../assets/Logo.jpg";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import spotify from "../../assets/spotify.png";
import github from "../../assets/github.png";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div className="mt-2 flex flex-col items-start justify-center rounded-md bg-gray-200 pt-4 pb-8 pl-6 text-Neutral-Strong md:flex-row md:items-center md:pl-0">
      <div className="flex flex-col items-start justify-center font-semibold">
        <div className="flex items-center justify-start">
          <img src={Logo} alt="Logo" className="mr-2 h-8 mt-0.5" />
          <h2 className="my-1 text-2xl">Follow us on: </h2>
        </div>
        <div className="ml-1 flex flex-col items-start justify-center text-xl">
          <div className="flex items-center justify-start">
            <img src={spotify} alt={"Spotify Logo"} className="mr-3 h-6" />
            <a
              className="hover:text-Neutral"
              href={
                "https://open.spotify.com/user/31y44dgc5i4bmxcat2ixzhfkz57q?si=19bdaef15d0e4dec"
              }
            >
              Spotify
            </a>
          </div>
          <div className="flex items-center justify-start">
            <img src={instagram} alt={"Instagram Logo"} className="mr-3 h-6" />
            <a
              className="hover:text-Neutral"
              href={
                "https://open.spotify.com/user/31y44dgc5i4bmxcat2ixzhfkz57q?si=19bdaef15d0e4dec"
              }
            >
              Instagram
            </a>
          </div>
          <div className="flex items-center justify-start">
            <img src={twitter} alt={"Twitter Logo"} className="mr-3 h-6" />
            <a
              className="hover:text-Neutral"
              href={"https://x.com/hourly_shitpost/status/1784417281637814715"}
            >
              Twitter/X
            </a>
          </div>
          <div className="flex items-center justify-start">
            <img src={github} alt={"Github Logo"} className="mr-3 h-6" />
            <a
              className="hover:text-Neutral"
              href={"https://github.com/spacemen0/DoubanEN"}
            >
              Github
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 ml-1 flex flex-col items-start justify-center text-lg font-semibold md:mt-0 md:ml-8">
        <h2 className="my-1 text-2xl">Quick Links: </h2>
        <div className="flex flex-col items-start justify-center text-xl ml-0.5">
          <Link to="/" className="hover:text-Neutral">
            Home
          </Link>
          <Link to="/contribute" className="hover:text-Neutral">
            Contribute
          </Link>
          <Link to="/login" className="hover:text-Neutral">
            Login
          </Link>
          <Link to="/register" className="hover:text-Neutral">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
