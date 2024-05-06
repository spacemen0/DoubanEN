import { useAuthContext } from "../contexts/AuthContext.ts";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { LoaderCircle } from "lucide-react";
import { ProfileFormData } from "../utils/type.ts";
import { updateProfile } from "../apiUtils/userApiUtil.ts";
import { Footer } from "../components/common/Footer.tsx";

export default function Edit() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProfileFormData>({
    bio: "",
    username: "",
    password: "",
    oldPassword: "",
    image: null,
  });
  useEffect(() => {
    if (!user) navigate("/login?redirect=edit");
  }, [user, navigate]);

  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll h-screen flex flex-col justify-between">
        <form className="mx-auto mt-1 flex !lg:flex-col w-full justify-center lg:mt-10 lg:w-4/6">
          <LeftSection formData={formData} setFormData={setFormData} />
          <RightSection formData={formData} setFormData={setFormData} />
        </form>
        <Footer />
      </div>
    </div>
  );
}

function LeftSection({
  formData,
  setFormData,
}: {
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
}) {
  const [processing, setProcessing] = useState(false);
  const { setMessage, user, token, refresh, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      Object.values(formData).some((value) => {
        if (typeof value === "string" && value.trim() !== "") {
          return true;
        } else if (typeof value === "object" && value !== null) {
          return true;
        }
        return false;
      }) &&
      user &&
      token
    )
      try {
        setProcessing(true);
        await updateProfile(user.id, token, formData);
        if (
          formData.oldPassword !== "" ||
          formData.password !== "" ||
          formData.username !== ""
        ) {
          await logout(token);
          navigate("/login");
          return;
        }
        setMessage("Update profile successfully");
        setProcessing(false);
        refresh();
        navigate(`/profile/${user.id}`);
      } catch (e) {
        setProcessing(false);
        const error = e as Error;
        if (error.message === "Send check password request error")
          setMessage("Error checking your old password");
        else if (error.message === "Check Password Response error")
          setMessage("Response Error");
        else if (error.message === "Wrong password")
          setMessage("Wrong password");
        else setMessage("Error updating your profile");
      }
    else {
      setMessage("Fill in some fields before submitting");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="flex w-full items-center justify-center bg-gray-100 lg:w-1/2">
      <div className="w-full max-w-md p-3 lg:p-6">
        <h1 className="mb-6 text-center text-3xl font-semibold text-Neutral-Strong">
          Update Your Info
        </h1>
        <h1 className="mb-6 text-center text-sm font-semibold text-Neutral-Mild">
          Fill in the fields you want to change
        </h1>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="new-username"
              className="block text-sm font-medium text-Neutral"
            >
              New Username
            </label>
            <input
              type="text"
              id="new-username"
              name="username"
              autoComplete={"off"}
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-Neutral"
            >
              New password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
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
              autoComplete="current-password"
              className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            />
          </div>

          <button
            onClick={handleSubmit}
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
        </div>
      </div>
    </div>
  );
}

function RightSection({
  formData,
  setFormData,
}: {
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setMessage } = useAuthContext();
  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const bio = event.target.value;
    setFormData((prevState) => ({ ...prevState, bio: bio }));
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    const file = fileList && fileList.item(0);
    if (file) {
      if (file.size < 1024 * 1024) {
        setFormData((prevState) => ({ ...prevState, image: file }));
      } else {
        if (fileInputRef.current) fileInputRef.current.value = "";
        setMessage("File size exceeds the limit (1MB)");
      }
    }
  };
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gray-100 px-4 py-2 md:px-40 lg:px-4 lg:py-6">
      <div className="w-full">
        <label
          htmlFor="image"
          className="mb-1 block text-xl font-semibold text-Neutral"
        >
          Profile Image
        </label>
        <input
          type="file"
          ref={fileInputRef}
          id="image"
          name="image"
          onChange={handleImageChange}
          accept="image/jpeg"
          className="mt-1 h-12 file:h-full w-full cursor-pointer file:rounded-sm rounded-md file:border-0 border-2 bg-white file:text-white transition-colors duration-300 file:bg-Neutral-Strong placeholder:text-l focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        />
      </div>
      <textarea
        className="mt-2 h-60 w-full resize-none rounded-lg border border-gray-300 p-2 ml-0.5 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
        name="bio"
        value={formData.bio}
        onChange={handleBioChange}
        placeholder="Update your bio here"
      />
    </div>
  );
}
