import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <button
        type="submit"
        className="flex w-full justify-center rounded-md p-2 pr-8  font-bold text-4xl transition-colors duration-300 "
      >
        <div className="mr-2 h-12 w-12 animate-spin">
          <LoaderCircle size={"48px"} />
        </div>
        Loading
      </button>
    </div>
  );
}
