import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { generateRandomData } from "../utils/data";
import { useAuthContext } from "../contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { MyImage } from "../components/common/MyImage";
import { WelcomeInfo } from "../components/common/WelcomeInfo";

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

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password, email, password_repeat } = formData;
    if (password_repeat !== password) return;
    await register(username, email, password);
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
      <RegisterForm
        onSubmit={handleRegister}
        formData={formData}
        onChange={handleInputChange}
      />
    </>
  );
}

function RegisterForm(props: {
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => Promise<void>;
  formData: {
    password: string;
    password_repeat: string;
    email: string;
    username: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="mx-auto mt-1 flex w-full justify-center lg:mt-10 lg:w-4/6">
        <div className="hidden flex-1 items-center justify-center bg-gray-100 px-6 py-2 lg:flex lg:py-6">
          <MyImage {...generateRandomData()} />
        </div>
        <div className="flex w-full items-center justify-center bg-gray-100 lg:w-1/2">
          <div className="w-full max-w-md p-3 lg:p-6">
            <h1 className="mb-6 text-center text-3xl font-semibold text-Neutral-Strong">
              Sign Up
            </h1>
            <h1 className="mb-6 text-center text-sm font-semibold text-Neutral-Mild">
              Join our community to keep track of your favorites
            </h1>

            <form onSubmit={props.onSubmit} method="POST" className="space-y-4">
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
                  value={props.formData.username}
                  onChange={props.onChange}
                  required={true}
                  autoComplete="off"
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
                  value={props.formData.email}
                  onChange={props.onChange}
                  required={true}
                  autoComplete="email"
                  className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
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
                  value={props.formData.password}
                  onChange={props.onChange}
                  required={true}
                  autoComplete="new-password"
                  className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                />
              </div>
              <div>
                <label
                  htmlFor="password_repeat"
                  className="block text-sm font-medium text-Neutral"
                >
                  Repeat Your Password
                </label>
                <input
                  type="password"
                  id="password_repeat"
                  name="password_repeat"
                  value={props.formData.password_repeat}
                  onChange={props.onChange}
                  required={true}
                  autoComplete="new-password"
                  className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full rounded-md p-2 text-white transition-colors duration-300 bg-Neutral-Strong hover:bg-Neutral focus:bg-Neutral-Strong focus:ring-Neutral-Strong focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <WelcomeInfo isLogin={false} />
    </div>
  );
}
