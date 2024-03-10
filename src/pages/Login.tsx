import { PageHeader } from "../layouts/PageHeader";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };
  return (
    <div className="">
      <PageHeader />
      <button onClick={handleLogin}> Log In</button>
    </div>
  );
}
