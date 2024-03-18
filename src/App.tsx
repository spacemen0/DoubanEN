import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import {NotFound} from "./components/common/NotFound";

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
                <div
                    className="inline-block h-8 w-8 rounded-full bg-current opacity-0 animate-[spinner-grow_0.75s_linear_infinite] align-[-0.125em] text-surface motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
          <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
                </div>
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
