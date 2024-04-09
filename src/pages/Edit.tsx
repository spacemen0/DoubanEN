import { useAuthContext } from "../contexts/AuthContext.ts";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PageHeader } from "../components/common/PageHeader.tsx";
import { LoaderCircle } from "lucide-react";

export default function Edit() {
  const navigate = useNavigate();
  const { isLoggedIn, setMessage, user } = useAuthContext();
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    bio: user?.bio ? user?.bio : "",
    profileImage: user?.profileImage,
    email: user?.email,
    password: "",
    oldPassword: "",
    image: null,
  });

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Call API to update user info
    setProcessing(true);
    setMessage("Success");
  };

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const bio = event.target.value;
    setFormData((prevState) => ({ ...prevState, bio: bio }));
  };
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  return (
    <div className="max-h-screen overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll">
        <div className="mx-auto mt-1 flex !md:flex-col w-full justify-center lg:mt-10 lg:w-4/6">
          <div className="flex w-full items-center justify-center bg-gray-100 lg:w-1/2">
            <div className="w-full max-w-md p-3 lg:p-6">
              <h1 className="mb-6 text-center text-3xl font-semibold text-Neutral-Strong">
                Update Your Info
              </h1>
              <h1 className="mb-6 text-center text-sm font-semibold text-Neutral-Mild">
                Update your info
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-Neutral"
                  >
                    password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={true}
                    autoComplete="new-password"
                    className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-Neutral"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    required={true}
                    autoComplete="current-password"
                    className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-Neutral"
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
                    className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md p-2 pr-8 text-white transition-colors duration-300 bg-Neutral-Strong hover:bg-Neutral focus:bg-Neutral-Strong focus:ring-Neutral-Strong focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  {processing ? (
                    <div className="mr-2 h-6 w-6 animate-spin">
                      <LoaderCircle />
                    </div>
                  ) : (
                    <div className="mr-2 h-6 w-6"></div>
                  )}
                  Update
                </button>
              </form>
            </div>
          </div>
          <div className="flex-col flex-1 items-center justify-center bg-gray-100 px-4 py-2 flex lg:py-6">
            <div className="w-full">
              <label
                htmlFor="image"
                className="block text-xl font-semibold mb-1 text-Neutral"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleInputChange}
                required={true}
                accept="image/jpeg"
                className="cursor-pointer file:border-0 file:bg-Neutral-Strong file:text-white file:rounded-sm file:h-full placeholder:text-l mt-1 h-12 w-full bg-white rounded-md border-2  transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              />
            </div>
            <textarea
              className="mt-2 ml-0.5 w-full h-60 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
              name="bio"
              value={formData.bio}
              onChange={handleBioChange}
              placeholder="Update your bio here"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
