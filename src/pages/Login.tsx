import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { PageHeader } from "../layouts/common/PageHeader";
import { Link, useNavigate } from "react-router-dom";
import { generateRandomData } from "../data";
import { MyImage } from "../layouts/common/MyImage";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuthContext();
  useEffect(() => {
    if (isLoggedIn) navigate("/profile");
  });

  const handleLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = formData;
    login(username, password);
    navigate("/");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <PageHeader />
      <div className="flex flex-col">
        <div className="flex justify-center w-full lg:w-4/6 mx-auto mt-1 lg:mt-10">
          <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-100 px-6 py-2 lg:py-6">
            <MyImage {...generateRandomData()} />
          </div>
          <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
            <div className="max-w-md w-full p-3 lg:p-6">
              <h1 className="text-3xl font-semibold mb-6 text-Neutral-Strong text-center">
                Welcome Back
              </h1>
              <h1 className="text-sm font-semibold mb-6 text-Neutral-Mild text-center">
                Login to keep track of your favorites
              </h1>

              <form onSubmit={handleLogin} method="POST" className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-Neutral"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required={true}
                    autoComplete="username"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-Neutral"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={true}
                    autoComplete="current-password"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-Neutral-Strong text-white p-2 rounded-md hover:bg-Neutral focus:outline-none focus:bg-Neutral-Strong focus:ring-2 focus:ring-offset-2 focus:ring-Neutral-Strong transition-colors duration-300"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 w-full lg:w-4/6 mx-auto mt-1 lg:mt-10 p-12 lg:p-24">
          <h1 className="text-2xl text-center">Don't Have an Account?</h1>
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
            to={"/register"}
            className="flex justify-center mt-4 lg:mt-8 bg-Neutral-Strong text-white p-2 rounded-md hover:bg-Neutral focus:outline-none focus:Neutral-Strong focus:ring-2 focus:ring-offset-2 focus:ring-Neutral-Strong transition-colors duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </>
  );
}
