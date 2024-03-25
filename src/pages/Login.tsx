import React, {useEffect, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import {PageHeader} from "../components/common/PageHeader";
import {useNavigate} from "react-router-dom";
import {generateRandomData} from "../utils/data";
import {MyImage} from "../components/common/MyImage";
import {WelcomeInfo} from "../components/common/WelcomeInfo";


export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const {isLoggedIn,user, login, setMessage} = useAuthContext();
  useEffect(() => {
    if (isLoggedIn) navigate(`/profile/${user?.id}`);
  });

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {username, password} = formData;
    try {
      await login(username, password);
      navigate("/");
    } catch (e) {
      const error = e as Error;
      setMessage(error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <PageHeader/>
      <div className="flex flex-col">
        <LoginForm
          onSubmit={handleLogin}
          formData={formData}
          onChange={handleInputChange}
        />
        <WelcomeInfo isLogin={true}/>
      </div>
    </>
  );
}

function LoginForm(props: {
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => Promise<void>;
  formData: { password: string; username: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mx-auto mt-1 flex w-full justify-center lg:mt-10 lg:w-4/6">
      <div className="hidden flex-1 items-center justify-center bg-gray-100 px-6 py-2 lg:flex lg:py-6">
        <MyImage {...generateRandomData()} />
      </div>
      <div className="flex w-full items-center justify-center bg-gray-100 lg:w-1/2">
        <div className="w-full max-w-md p-3 lg:p-6">
          <h1 className="mb-6 text-center text-3xl font-semibold text-Neutral-Strong">
            Welcome Back
          </h1>
          <h1 className="mb-6 text-center text-sm font-semibold text-Neutral-Mild">
            Login to keep track of your favorites
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
                autoComplete="username"
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
                autoComplete="current-password"
                className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full rounded-md p-2 text-white transition-colors duration-300 bg-Neutral-Strong hover:bg-Neutral focus:bg-Neutral-Strong focus:ring-Neutral-Strong focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
