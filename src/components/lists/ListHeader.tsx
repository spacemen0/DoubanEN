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
    <div className="mt-2 w-fit rounded-md py-2 md:mt-4">
      <p className="my-2 text-3xl font-bold text-Neutral">
        {lists.filter((list) => list.id === selectedList)[0].title}
      </p>
      <p className="my-4 text-xl font-semibold">
        {lists.filter((list) => list.id === selectedList)[0].description}
      </p>
      {user?.id === parseInt(userId!) && (
        <button
          className="mb-4 rounded-md text-lg font-semibold text-white p-1.5 bg-Neutral-Mild hover:bg-Neutral"
          onClick={handleDeleteList}
        >
          Delete this list
        </button>
      )}
    </div>
  );
}
