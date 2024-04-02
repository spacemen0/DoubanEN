import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser } from "../utils/services/authService.ts";
import { useAuthContext } from "../contexts/AuthContext.ts";
import Loading from "../components/common/Loading.tsx";

export default function Lists() {
  const { userId } = useParams();
  const [username, setUsername] = useState<string>("");
  const { setMessage, user } = useAuthContext();
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = await fetchUser(parseInt(userId!));
        setUsername(user.username);
      } catch (e) {
        const error = e as Error;
        if (error.message === "Not exist")
          setMessage("This user does not exist");
        else if (error.message === "Response error")
          setMessage("Error processing request");
        else setMessage("Error fetching username for this user");
      }
    };
    if (user?.id === userId) setUsername(user!.username);
    fetchUsername().then();
  }, [user, userId, setMessage]);
  if (username) return <div>{username}'s Lists</div>;
  return <Loading></Loading>;
}
