export function OptionSelect({
  selectedOption,
  handleOptionClick,
}: {
  selectedOption: "Rated" | "Wishlist" | "Doing" | "Reviewed";
  handleOptionClick: (
    status: "Rated" | "Wishlist" | "Doing" | "Reviewed",
  ) => void;
}) {
  return (
    <div className="mt-4 flex justify-start gap-4 text-lg font-semibold text-Neutral-Mild md:py-0.5 md:text-2xl lg:gap-10 lg:text-3xl">
      <button
        className={`border-b-2  ${
          selectedOption == "Rated" ? " font-bold" : ""
        }`}
        onClick={() => {
          handleOptionClick("Rated");
        }}
      >
        Rated
      </button>
      <button
        className={`border-b-2  ${
          selectedOption == "Doing" ? "font-bold" : ""
        }`}
        onClick={() => {
          handleOptionClick("Doing");
        }}
      >
        Listening / Watching / Reading
      </button>
      <button
        className={`border-b-2  ${
          selectedOption == "Wishlist" ? "font-bold" : ""
        }`}
        onClick={() => {
          handleOptionClick("Wishlist");
        }}
      >
        Wishlist
      </button>
      <button
        className={`border-b-2  ${
          selectedOption == "Reviewed" ? "font-bold" : ""
        }`}
        onClick={() => {
          handleOptionClick("Reviewed");
        }}
      >
        Reviewed
      </button>
    </div>
  );
}
