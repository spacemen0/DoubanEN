import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { useAuthContext } from "../contexts/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { FullImage } from "../components/common/FullImage.tsx";
import { WelcomeInfo } from "../components/common/WelcomeInfo";
import { LoaderCircle } from "lucide-react";
import cover from "../assets/Cover.jpg";
import { Footer } from "../components/common/Footer.tsx";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_repeat: "",
  });
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const { user, register, setMessage } = useAuthContext();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    const { username, password, email, password_repeat } = formData;
    if (password_repeat !== password) return;
    try {
      await register(username, email, password);
      setProcessing(false);
      navigate("/");
    } catch (e) {
      setProcessing(false);
      const error = e as Error;
      if (error.message === "Conflict")
        setMessage("Username or email already be taken");
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
        <RegisterForm
          onSubmit={handleRegister}
          formData={formData}
          onChange={handleInputChange}
          processing={processing}
        />
        <WelcomeInfo isLogin={false} />
        <Footer />
      </div>
    </div>
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
  processing: boolean;
}) {
  const password = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (password.current) {
      password.current.addEventListener("input", function () {
        if (password.current)
          if (password.current.validity.patternMismatch) {
            password.current.setCustomValidity(
              "Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long",
            );
          } else {
            password.current.setCustomValidity("");
          }
      });
    }
  });
  return (
    <div className="mx-auto mt-1 flex w-full justify-center lg:mt-10 lg:w-4/6">
      <div className="hidden flex-1 items-center justify-center bg-gray-100 px-6 py-2 lg:flex lg:py-6">
        <FullImage src={cover} alt={"pageImage"} />
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
                ref={password}
                type="password"
                id="password"
                name="password"
                value={props.formData.password}
                onChange={props.onChange}
                required={true}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
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
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required={true}
                autoComplete="new-password"
                className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              />
            </div>
            <div>
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
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
