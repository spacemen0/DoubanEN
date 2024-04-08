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
    username: user?.username,
    // Add more fields as needed
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
        <div className="mx-auto mt-1 flex w-full justify-center lg:mt-10 lg:w-4/6">
          <div className="hidden flex-1 items-center justify-center bg-gray-100 px-6 py-2 lg:flex lg:py-6">
            <textarea
              className="w-full h-60 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
              name="bio"
              value={formData.bio}
              onChange={handleBioChange}
              placeholder="Update your bio here"
            />
          </div>
          <div className="flex w-full items-center justify-center bg-gray-100 lg:w-1/2">
            <div className="w-full max-w-md p-3 lg:p-6">
              <h1 className="mb-6 text-center text-3xl font-semibold text-Neutral-Strong">
                Welcome Back
              </h1>
              <h1 className="mb-6 text-center text-sm font-semibold text-Neutral-Mild">
                Update your info
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                {/* Add more fields as needed */}
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
        </div>
      </div>
    </div>
  );
}
