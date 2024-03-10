import { useSelector } from "react-redux";
import { PageHeader } from "../layouts/PageHeader";
import { selectIsLoggedIn, selectUser } from "../slices/userSlice";
import { Link } from "react-router-dom";

export function Profile() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  return (
    <div className="">
      <PageHeader />
      Profile
      {isLoggedIn && (
        <div className="pb-1">
          <Link
            className="hidden md:inline font-bold text-lg text-sky-600 h-10"
            to={"profile"}
          >
            {user?.name}
          </Link>
        </div>
      )}
    </div>
  );
}
