import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../layouts/PageHeader";
import { generateRandomData } from "../data";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Image } from "../components/Image";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_repeat: "",
  });
  const navigate = useNavigate();
  const { isLoggedIn, register } = useAuthContext();
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleRegister = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password, email, password_repeat } = formData;
    if (password_repeat !== password) return;
    register(username, email, password);
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
            <Image {...generateRandomData()} />
          </div>
          <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
            <div className="max-w-md w-full p-3 lg:p-6">
              <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                Sign Up
              </h1>
              <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
                Join our community to keep track of your favorites
              </h1>

              <form
                onSubmit={handleRegister}
                method="POST"
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
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
                    autoComplete="off"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required={true}
                    autoComplete="email"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
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
                    autoComplete="new-password"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password_repeat"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Repeat Your Password
                  </label>
                  <input
                    type="password"
                    id="password_repeat"
                    name="password_repeat"
                    value={formData.password_repeat}
                    onChange={handleInputChange}
                    required={true}
                    autoComplete="new-password"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 w-full lg:w-4/6 mx-auto mt-1 lg:mt-10 p-12 lg:p-24">
          <h1 className="text-2xl text-center">Already Have an Account?</h1>
          <p className="mt-4 lg:mt-8">
            {" "}
            With a <strong>DoubanEN</strong> account, you can:{" "}
            <strong>rate, review, catalog</strong>, and tag your music track
            your upcoming (and past) shows find new music and people through
            <strong> recommendations</strong> create and publish lists of your
            favorite things research music, cross-referenced by label, artist,
            location, and genre. <strong>socialize</strong> through forums and
            private messaging contribute to an always-growing public music
            database
          </p>
          <Link
            to={"/register"}
            className="flex justify-center mt-4 lg:mt-8 bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
          >
            Log In Now
          </Link>
        </div>
      </div>
    </>
  );
}
