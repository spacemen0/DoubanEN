export function MediaOptionSelect({
  selectedOption,
  handleOptionSelect,
}: {
  selectedOption: "Music" | "Movie" | "Book";
  handleOptionSelect: (option: "Music" | "Movie" | "Book") => void;
}) {
  return (
    <div className="flex justify-start gap-10 text-2xl">
      <button
        className={`border-b-2  ${
          selectedOption == "Music" ? "text-Music font-bold" : ""
        }`}
        onClick={() => handleOptionSelect("Music")}
      >
        Music
      </button>
      <button
        className={`border-b-2  ${
          selectedOption == "Movie" ? "text-Movie font-bold" : ""
        }`}
        onClick={() => handleOptionSelect("Movie")}
      >
        Movie
      </button>
      <button
        className={`border-b-2  ${
          selectedOption == "Book" ? "text-Book font-bold" : ""
        }`}
        onClick={() => handleOptionSelect("Book")}
      >
        Book
      </button>
    </div>
  );
}
