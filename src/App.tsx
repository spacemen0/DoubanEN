import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const List = lazy(() => import("./pages/List"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Book = lazy(() => import("./pages/Book"));
const Books = lazy(() => import("./pages/Books"));
const Music = lazy(() => import("./pages/Music"));
const Musics = lazy(() => import("./pages/Musics"));
const Movie = lazy(() => import("./pages/Movie"));
const Movies = lazy(() => import("./pages/Movies"));

export default function App() {
  return (
    <Suspense
      fallback={
        <div
          className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-surface opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/list/:id" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/books" element={<Books />} />
        <Route path="/music/:id" element={<Music />} />
        <Route path="/musics" element={<Musics />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Suspense>
  );
}
