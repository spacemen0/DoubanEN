import { ListInfo, User } from "../../utils/type.ts";

export function ListHeader({
  lists,
  selectedList,
  userId,
  handleDeleteList,
  user,
}: {
  lists: ListInfo[];
  selectedList: number | undefined;
  userId: string | undefined;
  handleDeleteList: () => void;
  user: User | null;
}) {
  return (
    <div className="py-2 rounded-md md:mt-4 mt-2 w-fit">
      <p className="my-2 text-3xl font-bold text-Neutral">
        {lists.filter((list) => list.id === selectedList)[0].title}
      </p>
      <p className="my-4 text-xl font-semibold">
        {lists.filter((list) => list.id === selectedList)[0].description}
      </p>
      {user?.id === parseInt(userId!) && (
        <button
          className="rounded-md p-1.5 font-semibold text-white bg-Neutral-Mild hover:bg-Neutral mb-4 text-lg"
          onClick={handleDeleteList}
        >
          Delete this list
        </button>
      )}
    </div>
  );
}
