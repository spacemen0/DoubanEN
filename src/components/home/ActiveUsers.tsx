import { useEffect, useState } from "react";
import { User } from "../../utils/type.ts";
import { UserItem } from "../common/UserItem.tsx";
import { activeUserIds } from "../../utils/data.ts";
import { fetchUser } from "../../apiUtils/userApiUtil.ts";
import { useAuthContext } from "../../contexts/AuthContext.ts";

export function ActiveUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const { setMessage } = useAuthContext();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUserIds = new Set();
        activeUserIds.map(async (userId) => {
          if (!fetchedUserIds.has(userId)) {
            fetchedUserIds.add(userId);
            const newUser = await fetchUser(userId);
            setUsers((prevState) => {
              if (!prevState.some((user) => user.id === newUser.id)) {
                return [...prevState, newUser];
              }
              return prevState;
            });
          }
        });
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
    };
    fetchUsers().then();
  }, [setMessage]);

  if (!users) return <></>;
  return (
    <div className="mt-6 flex flex-col text-Neutral lg:mt-12 lg:w-10/12">
      <h1 className="text-2xl font-bold text-Neutral xl:text-3xl">
        Active Users
      </h1>
      <ul className="mt-4 px-1">
        {users.length > 0 &&
          users.map((user, index) => (
            <li
              key={user.id}
              className={`my-1 py-2 ${index !== users.length - 1 && "border-b"}`}
            >
              <UserItem user={user} />
            </li>
          ))}
      </ul>
    </div>
  );
}
