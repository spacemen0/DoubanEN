import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { PageHeader } from "../layouts/PageHeader";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuthContext();
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    login("Username", "password");
    navigate("/");
  };
  return (
    <div className="">
      <PageHeader />
      <button onClick={handleLogin}> Log In</button>
    </div>
  );
}
