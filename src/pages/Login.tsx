import React, { useEffect, useState } from "react";
import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FullImage } from "../components/common/FullImage.tsx";
import { WelcomeInfo } from "../components/common/WelcomeInfo";
import { LoaderCircle } from "lucide-react";
import { Footer } from "../components/common/Footer.tsx";
import cover from "../assets/Cover.jpg";
import { useAuthStore } from "../contexts/AuthStore.ts";

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const setMessage = useAuthStore((state) => state.setMessage);
  useEffect(() => {
    if (user) navigate(`/profile/${user.id}`);
  });

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setProcessing(true);
    e.preventDefault();
    const { username, password } = formData;
    try {
      await login(username, password);
      setProcessing(false);
      redirect ? navigate(`/${redirect}`) : navigate("/");
    } catch (e) {
      const error = e as Error;
      if (error.message === "Unauthorized")
        setMessage("Incorrect username or password");
      else setMessage(error.message);
      setProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="flex flex-col overflow-y-scroll">
        <LoginForm
          onSubmit={handleLogin}
          formData={formData}
          onChange={handleInputChange}
          processing={processing}
        />
        <WelcomeInfo isLogin={true} />
        <Footer />
      </div>
    </div>
  );
}

function LoginForm(props: {
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => Promise<void>;
  formData: { password: string; username: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  processing: boolean;
}) {
  return (
    <div className="mx-auto mt-1 flex w-full justify-center lg:mt-10 lg:w-4/6">
      <div className="hidden flex-1 items-center justify-center bg-gray-100 px-6 py-2 lg:flex lg:py-6">
        <FullImage src={cover} alt={"pageImage"} />
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
                className="flex w-full justify-center rounded-md p-2 pr-8 text-white transition-colors duration-300 bg-Neutral-Strong hover:bg-Neutral focus:bg-Neutral-Strong focus:ring-Neutral-Strong focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                {props.processing ? (
                  <div className="mr-2 h-6 w-6 animate-spin">
                    <LoaderCircle />
                  </div>
                ) : (
                  <div className="mr-2 h-6 w-6"></div>
                )}
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
