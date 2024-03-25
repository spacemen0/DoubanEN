import {Link} from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold lg:text-4xl">
        404 - Page Not Found
      </h1>
      <p className="mb-6 text-center text-lg font-semibold">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
      >
        Go to Home Page
      </Link>
    </div>
  );
};
