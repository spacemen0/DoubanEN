import { useDispatch } from "react-redux";
import { PageHeader } from "../layouts/PageHeader";
import { setUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = {
      name: "spacemen0",
      id: "1",
    };
    console.log(userData);
    dispatch(setUser(userData));
    navigate("/");
  };
  return (
    <div className="">
      <PageHeader />
      <button onClick={handleLogin}> Log In</button>
    </div>
  );
}
