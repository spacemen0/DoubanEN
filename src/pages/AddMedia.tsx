import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext.ts";
import { addMedia } from "../apiUtils/mediaApiUtil.ts";
import { Author, Media } from "../utils/type.ts";
import { LoaderCircle } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader.tsx";
import { useNavigate } from "react-router-dom";
import { getAllAuthors } from "../apiUtils/authorApiUtil.ts";
import { bookGenres, movieGenres, musicGenres } from "../utils/data.ts";

export default function AddMedia() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setMessage, user, token } = useAuthContext();
  const [processing, setProcessing] = useState(false);
  const [addition, setAddition] = useState("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [formData, setFormData] = useState<Media>({
    id: 0,
    imageUrl: "",
    type: "Music",
    description: "",
    title: "",
    author_name: "",
    author: 52,
    releaseDate: "",
    genre: "Experimental",
    average: 0,
    ratings: 0,
    wants: 0,
    doings: 0,
    additional: "",
  });
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=add-media");
    }
  }, [navigate, user]);

  useEffect(() => {
    const fetAuthors = async () => {
      try {
        setAuthors(await getAllAuthors());
      } catch (e) {
        console.log(e);
      }
    };
    fetAuthors().then();
  }, [navigate, user]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      image &&
      user &&
      token &&
      formData.description !== "" &&
      formData.additional !== "" &&
      formData.releaseDate !== ""
    ) {
      try {
        setProcessing(true);
        await addMedia(formData, token, image);
        user.role === "Admin"
          ? setMessage("Media added successfully")
          : setMessage("Media request sent successfully");
        setProcessing(false);
      } catch (error) {
        setProcessing(false);
        setMessage("Error adding media");
      }
    } else {
      setMessage("Please fill in all fields");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    const file = fileList && fileList.item(0);
    if (file) {
      if (file.size < 1024 * 1024) setImage(fileList.item(0));
      else {
        setMessage("File size exceeds the limit (1MB)");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  return (
    user && (
      <div className="flex max-h-screen flex-col overflow-hidden">
        <PageHeader />
        <div className="overflow-y-scroll">
          <div className="mx-auto mt-1 flex !md:flex-col w-full justify-center lg:mt-10 lg:w-4/6">
            <div className="flex w-full items-center justify-center bg-gray-100">
              <div className="w-full p-3 lg:p-6">
                <h1 className="mb-6 text-center text-3xl font-semibold text-Neutral-Strong">
                  Add Media
                </h1>

                <form className=" flex !md:flex-col md:gap-16 lg:gap-24 justify-center items-start !md:items-center !md:justify-start">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-xl font-medium text-Neutral"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 w-72 rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="type"
                        className="block text-xl font-medium text-Neutral"
                      >
                        Type
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleSelectChange}
                        className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      >
                        <option value="Music">Music</option>
                        <option value="Movie">Movie</option>
                        <option value="Book">Book</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="author"
                        className="block text-xl font-medium text-Neutral"
                      >
                        Author
                      </label>
                      <select
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleSelectChange}
                        className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      >
                        {authors &&
                          authors.map((author) => {
                            if (
                              (formData.type === "Music" &&
                                author.type === "Artist") ||
                              (formData.type === "Movie" &&
                                author.type === "Director") ||
                              (formData.type === "Book" &&
                                author.type === "Author")
                            ) {
                              return (
                                <option key={author.id} value={author.id}>
                                  {author.name}
                                </option>
                              );
                            }
                          })}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-xl font-medium text-Neutral"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleTextAreaChange}
                        className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                        rows={4}
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-1">
                    <div>
                      <label
                        htmlFor="image"
                        className="block text-xl font-semibold text-Neutral"
                      >
                        Cover Image
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/jpeg"
                        className="mt-1 h-10 file:h-full w-full cursor-pointer file:rounded-sm rounded-md file:border-0 border-2 bg-white file:text-white transition-colors duration-300 file:bg-Neutral-Strong placeholder:text-l focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="releaseDate"
                        className="block text-xl font-medium text-Neutral"
                      >
                        Release Date
                      </label>
                      <input
                        type="date"
                        id="releaseDate"
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="genre"
                        className="block text-xl font-medium text-Neutral"
                      >
                        Genre
                      </label>
                      <select
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleSelectChange}
                        className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      >
                        {formData.type === "Music" && (
                          <>
                            {musicGenres.map((genre) => (
                              <option key={genre.value} value={genre.value}>
                                {genre.name}
                              </option>
                            ))}
                          </>
                        )}

                        {formData.type === "Movie" && (
                          <>
                            {movieGenres.map((genre) => (
                              <option key={genre.value} value={genre.value}>
                                {genre.name}
                              </option>
                            ))}
                          </>
                        )}

                        {formData.type !== "Music" &&
                          formData.type !== "Movie" && (
                            <>
                              {bookGenres.map((genre) => (
                                <option key={genre.value} value={genre.value}>
                                  {genre.name}
                                </option>
                              ))}
                            </>
                          )}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="addition"
                        className="text-xl font-medium text-Neutral"
                      >
                        {formData.type === "Music"
                          ? "Add track"
                          : formData.type === "Movie"
                            ? "Add Character then Cast "
                            : "Add Chapter"}
                      </label>
                      <input
                        type="text"
                        id="addition"
                        name="addtion"
                        value={addition}
                        onChange={(e) => {
                          setAddition(e.target.value);
                        }}
                        className="mt-1 w-full rounded-md border p-2 transition-colors duration-300
                          focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      />
                      <div className="flex justify-start items-center mt-2">
                        <button
                          className="rounded-md p-2 text-white transition-colors duration-300 bg-Neutral-Strong
                        hover:bg-Neutral focus:bg-Neutral-Strong focus:ring-Neutral-Strong focus:outline-none focus:ring-2
                        focus:ring-offset-2"
                          onClick={(e) => {
                            e.preventDefault();
                            if (formData.additional === "")
                              setFormData((prevData) => ({
                                ...prevData,
                                additional: addition,
                              }));
                            else
                              setFormData((prevData) => ({
                                ...prevData,
                                additional:
                                  formData.additional + "\n" + addition,
                              }));
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          className="rounded-md p-2 ml-2 text-white transition-colors duration-300 bg-Neutral-Strong
                        hover:bg-Neutral focus:bg-Neutral-Strong focus:ring-Neutral-Strong focus:outline-none focus:ring-2
                        focus:ring-offset-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData((prevState) => ({
                              ...prevState,
                              additional: "",
                            }));
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="flex flex-col justify-center items-center mb-2">
                  <label
                    htmlFor="additional"
                    className="block text-xl font-medium text-Neutral"
                  >
                    {formData.type === "Music"
                      ? "Tracks"
                      : formData.type === "Movie"
                        ? "Casts Info"
                        : "Chapters"}
                  </label>
                  <textarea
                    id="additional"
                    name="additional"
                    value={formData.additional}
                    readOnly={true}
                    className="mt-1 w-[90%] md:w-3/5  rounded-md border p-2
                        focus:outline-none focus:ring-0"
                    rows={4}
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  className="mx-auto flex w-40 justify-center rounded-md p-2 pr-8 text-white
                   transition-colors duration-300 bg-Neutral-Strong hover:bg-Neutral focus:bg-Neutral-Strong
                   focus:ring-Neutral-Strong focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  {processing ? (
                    <div className="mr-2 h-6 w-6 animate-spin">
                      <LoaderCircle />
                    </div>
                  ) : (
                    <div className="mr-2 h-6 w-6"></div>
                  )}
                  {user.role === "Admin" ? "Add Media" : "Request"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
