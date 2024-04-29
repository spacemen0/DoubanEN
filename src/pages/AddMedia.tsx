import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext.ts";
import { addMedia } from "../apiUtils/mediaApiUtil.ts";
import { Author, Media } from "../utils/type.ts";
import { LoaderCircle } from "lucide-react";
import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { useNavigate } from "react-router-dom";
import { addAuthor, getAllAuthors } from "../apiUtils/authorApiUtil.ts";
import { bookGenres, movieGenres, musicGenres } from "../utils/data.ts";
import { Footer } from "../components/common/Footer.tsx";

const initialMedia: Media = {
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
};

const initialAuthor: Author = {
  id: 0,
  name: "",
  type: "Artist",
  genres: [],
};

export default function AddMedia() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setMessage, user, token } = useAuthContext();
  const [processing, setProcessing] = useState(false);
  const [addition, setAddition] = useState("");
  const [authorGenre, setAuthorGenre] = useState("Experimental");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [media, setMedia] = useState<Media>(initialMedia);
  const [image, setImage] = useState<File | null>(null);
  const [author, setAuthor] = useState<Author>(initialAuthor);

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
  const handleMediaSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      image &&
      user &&
      token &&
      media.description !== "" &&
      media.additional !== "" &&
      media.releaseDate !== ""
    ) {
      try {
        setProcessing(true);
        await addMedia(media, token, image);
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

  const handleAuthorSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user && token && author.name !== "") {
      try {
        setProcessing(true);
        const newAuthor = await addAuthor(author, token, user.role);
        if (typeof newAuthor !== "string")
          setAuthors((prevState) => prevState.concat(newAuthor));
        user.role === "Admin"
          ? setMessage("Author added successfully")
          : setMessage("Author request sent successfully");
        setProcessing(false);
      } catch (error) {
        setProcessing(false);
        setMessage("Error adding author");
      }
    } else {
      setMessage("Please fill in all fields");
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    forMedia: boolean = true,
  ) => {
    const { name, value } = event.target;
    if (forMedia)
      setMedia((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    else
      setAuthor((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };
  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    forMedia: boolean = true,
  ) => {
    const { name, value } = event.target;
    if (forMedia)
      setMedia((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    else
      setAuthor((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setMedia((prevData) => ({
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
                        value={media.title}
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
                        value={media.type}
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
                        value={media.author}
                        onChange={handleSelectChange}
                        className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      >
                        {authors &&
                          authors.map((author) => {
                            if (
                              (media.type === "Music" &&
                                author.type === "Artist") ||
                              (media.type === "Movie" &&
                                author.type === "Director") ||
                              (media.type === "Book" &&
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
                        value={media.description}
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
                        value={media.releaseDate}
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
                        value={media.genre}
                        onChange={handleSelectChange}
                        className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      >
                        {media.type === "Music" && (
                          <>
                            {musicGenres.map((genre) => (
                              <option key={genre} value={genre}>
                                {genre}
                              </option>
                            ))}
                          </>
                        )}

                        {media.type === "Movie" && (
                          <>
                            {movieGenres.map((genre) => (
                              <option key={genre} value={genre}>
                                {genre}
                              </option>
                            ))}
                          </>
                        )}

                        {media.type !== "Music" && media.type !== "Movie" && (
                          <>
                            {bookGenres.map((genre) => (
                              <option key={genre} value={genre}>
                                {genre}
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
                        {media.type === "Music"
                          ? "Add track"
                          : media.type === "Movie"
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
                      <div className="mt-2 flex items-center justify-start">
                        <button
                          className="rounded-md p-2 text-white transition-colors duration-300 bg-Neutral-Strong
                        hover:bg-Neutral focus:bg-Neutral-Strong focus:ring-Neutral-Strong focus:outline-none focus:ring-2
                        focus:ring-offset-2"
                          onClick={(e) => {
                            e.preventDefault();
                            if (media.additional === "")
                              setMedia((prevData) => ({
                                ...prevData,
                                additional: addition,
                              }));
                            else
                              setMedia((prevData) => ({
                                ...prevData,
                                additional: media.additional + "\n" + addition,
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
                            setMedia((prevState) => ({
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
                <div className="mb-2 flex flex-col items-center justify-center">
                  <label
                    htmlFor="additional"
                    className="block text-xl font-medium text-Neutral"
                  >
                    {media.type === "Music"
                      ? "Tracks"
                      : media.type === "Movie"
                        ? "Casts Info"
                        : "Chapters"}
                  </label>
                  <textarea
                    id="additional"
                    name="additional"
                    value={media.additional}
                    readOnly={true}
                    className="mt-1 w-[90%] md:w-3/5  rounded-md border p-2
                        focus:outline-none focus:ring-0"
                    rows={4}
                  ></textarea>
                </div>
                <button
                  onClick={handleMediaSubmit}
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

          <div className="mx-auto mt-1 flex !md:flex-col w-full justify-center lg:mt-10 lg:w-4/6">
            <div className="flex w-full items-center justify-center bg-gray-100">
              <div className="w-full p-3 lg:p-6">
                <h1 className="mb-6 text-center text-3xl font-semibold text-Neutral-Strong">
                  Add Author
                </h1>

                <form className="flex flex-col items-center justify-center md:gap-16 lg:gap-24">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xl font-medium text-Neutral"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={author.name}
                        onChange={(e) => {
                          handleInputChange(e, false);
                        }}
                        className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="author-type"
                        className="block text-xl font-medium text-Neutral"
                      >
                        Type
                      </label>
                      <div>
                        <select
                          id="author-type"
                          name="author-type"
                          value={author.type}
                          onChange={(e) => {
                            handleSelectChange(e, false);
                          }}
                          className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                        >
                          <option value="Artist">Artist</option>
                          <option value="Director">Director</option>
                          <option value="Author">Author</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="author-genre"
                        className="block text-xl font-medium text-Neutral"
                      >
                        Genre
                      </label>
                      <div className="flex items-center justify-start">
                        <select
                          id="author-genre"
                          name="author-genre"
                          value={authorGenre}
                          onChange={(e) => {
                            setAuthorGenre(e.target.value);
                          }}
                          className="mt-1 w-full rounded-md border p-2 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                        >
                          {media.type === "Music" && (
                            <>
                              {musicGenres.map((genre) => (
                                <option key={genre} value={genre}>
                                  {genre}
                                </option>
                              ))}
                            </>
                          )}

                          {media.type === "Movie" && (
                            <>
                              {movieGenres.map((genre) => (
                                <option key={genre} value={genre}>
                                  {genre}
                                </option>
                              ))}
                            </>
                          )}

                          {media.type !== "Music" && media.type !== "Movie" && (
                            <>
                              {bookGenres.map((genre) => (
                                <option key={genre} value={genre}>
                                  {genre}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                        <button
                          className="rounded-md ml-2 p-2 text-white transition-colors duration-300 bg-Neutral-Strong
                        hover:bg-Neutral focus:bg-Neutral-Strong focus:ring-Neutral-Strong focus:outline-none focus:ring-2
                        focus:ring-offset-2"
                          onClick={(e) => {
                            e.preventDefault();
                            if (!author.genres.includes(authorGenre))
                              setAuthor((prevState) => ({
                                ...prevState,
                                genres: prevState.genres.concat(authorGenre),
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
                            setAuthor((prevState) => ({
                              ...prevState,
                              genres: [],
                            }));
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    <ul className="my-4">
                      <h2 className="my-2 text-xl font-medium text-Neutral">
                        Genres:{" "}
                      </h2>
                      {author.genres.length > 0 &&
                        author.genres.map((genre) => (
                          <li
                            className="ml-6 list-decimal text-lg font-medium text-Neutral"
                            key={genre}
                          >
                            {genre}
                          </li>
                        ))}
                    </ul>
                  </div>
                </form>

                <button
                  onClick={handleAuthorSubmit}
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
                  {user.role === "Admin" ? "Add Author" : "Request"}
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  );
}
