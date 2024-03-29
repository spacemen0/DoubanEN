import { useNavigate } from "react-router-dom";

export default function HeaderNavBarSection({
  forMedium: forMedium,
}: {
  forMedium: boolean;
}) {
  const navigate = useNavigate();
  const height: string = forMedium ? "h-10" : "h-7";
  const style: string = `flex max-w-[60px] items-center transition-colors hover:bg-gray-100 
    rounded-lg flex-grow justify-center p-1 md:p-2 font-bold ${height} `;
  return (
    <div
      className={`justify-around md: gap-2 text-lg  max-w-[768px] lg: w - full ${
        forMedium ? "hidden md:flex" : "flex md:hidden"
      }`}
    >
      <button
        onClick={() => {
          navigate("/medias/music");
        }}
        className={`${style}text-Music`}
      >
        Music
      </button>
      <button
        onClick={() => {
          navigate("/medias/movie");
        }}
        className={`${style}text-Movie`}
      >
        Movie
      </button>
      <button
        onClick={() => {
          navigate("/medias/book");
        }}
        className={`${style}text-Book`}
      >
        Book
      </button>
    </div>
  );
}
