import {Link} from "react-router-dom";

export function WelcomeInfo({isLogin}:{isLogin:boolean}) {
    return <div className="bg-gray-100 w-full lg:w-4/6 mx-auto mt-1 lg:mt-10 p-12 lg:p-24">
        <h1 className="text-2xl text-center">{isLogin?`Don't Have an Account?`:'Already Have an Account?'}</h1>
        <p className="mt-4 lg:mt-8">
            {" "}
            Unlock the full potential of Douban EN by <strong>
            creating
        </strong>{" "}
            an account. With your <strong>DoubanEN account</strong>, you gain
            access to a myriad of features, allowing you to{" "}
            <strong>rate, review, catalog, and tag</strong> your favorite music,
            movies, and books. Discover new medias and like-minded individuals
            through <strong>personalized recommendations</strong>. Create and
            share <strong>lists</strong> of your favorite items, engage in
            lively discussions through{" "}
            <strong>forums and private messaging</strong>, and{" "}
            <strong>contribute</strong> to our ever-expanding public music
            database.
        </p>
        <Link
            to={isLogin?"/register":"/login"}
            className="flex justify-center mt-4 lg:mt-8 bg-Neutral-Strong text-white p-2 rounded-md hover:bg-Neutral focus:outline-none focus:Neutral-Strong focus:ring-2 focus:ring-offset-2 focus:ring-Neutral-Strong transition-colors duration-300"
        >
            {isLogin?"Sign Up Now":"Log In Now"}
        </Link>
    </div>;
}
