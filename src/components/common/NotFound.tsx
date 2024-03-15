import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl lg:text-4xl font-bold mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-center font-semibold mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Go to Home Page
      </Link>
    </div>
  );
};
