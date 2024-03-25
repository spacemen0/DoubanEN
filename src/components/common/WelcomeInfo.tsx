import {Link} from "react-router-dom";

export function WelcomeInfo({isLogin}: { isLogin: boolean }) {
  return (
    <div className="mx-auto mt-1 w-full bg-gray-100 p-12 lg:mt-10 lg:w-4/6 lg:p-24">
      <h1 className="text-center text-2xl">
        {isLogin ? `Don't Have an Account?` : "Already Have an Account?"}
      </h1>
      <p className="mt-4 lg:mt-8">
        {" "}
        Unlock the full potential of Douban EN by <strong>creating</strong> an
        account. With your <strong>DoubanEN account</strong>, you gain access to
        a myriad of features, allowing you to{" "}
        <strong>rate, review, catalog, and tag</strong> your favorite music,
        movies, and books. Discover new medias and like-minded individuals
        through <strong>personalized recommendations</strong>. Create and share{" "}
        <strong>lists</strong> of your favorite items, engage in lively
        discussions through <strong>forums and private messaging</strong>, and{" "}
        <strong>contribute</strong> to our ever-expanding public music database.
      </p>
      <Link
        to={isLogin ? "/register" : "/login"}
        className="mt-4 flex justify-center rounded-md p-2 text-white transition-colors duration-300 bg-Neutral-Strong hover:bg-Neutral focus:Neutral-Strong focus:ring-Neutral-Strong focus:outline-none focus:ring-2 focus:ring-offset-2 lg:mt-8"
      >
        {isLogin ? "Sign Up Now" : "Log In Now"}
      </Link>
    </div>
  );
}
