import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { NotFound } from "./components/common/NotFound";
import Loading from "./components/common/Loading.tsx";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const List = lazy(() => import("./pages/List"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Media = lazy(() => import("./pages/Media"));
const MediaByType = lazy(() => import("./pages/MediaByType.tsx"));
const Author = lazy(() => import("./pages/AuthorPage.tsx"));
const Collection = lazy(() => import("./pages/Collection.tsx"));
const Lists = lazy(() => import("./pages/Lists.tsx"));
const Edit = lazy(() => import("./pages/Edit.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const Contribute = lazy(() => import("./pages/Contribute.tsx"));
const Admin = lazy(() => import("./pages/Admin.tsx"));
export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/list/:id" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/media/:id" element={<Media />} />
        <Route path="/media" element={<MediaByType />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/lists/:userId" element={<Lists />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
