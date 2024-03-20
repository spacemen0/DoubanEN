import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import {NotFound} from "./components/common/NotFound";
import Loading from "./components/common/Loading.tsx";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const List = lazy(() => import("./pages/List"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Media = lazy(() => import("./pages/Media"));
const Medias = lazy(() => import("./pages/Medias"));
const Author = lazy(() => import("./pages/Author"))

export default function App() {
    return (
        <Suspense
            fallback={
                <Loading/>
            }
        >
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile/:id" element={<Profile/>}/>
                <Route path="/list/:id" element={<List/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/media/:type/:id" element={<Media/>}/>
                <Route path="/media/:type" element={<Medias/>}/>
                <Route path="author/:id" element={<Author/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </Suspense>
    );
}
