import React from "react";
import { StatusType } from "../../utils/type.ts";

export function OptionSelect({
  selectedOption,
  handleOptionClick,
  setCurrentPage,
}: {
  selectedOption: StatusType;
  handleOptionClick: (status: StatusType) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="mt-2 flex justify-start gap-4 text-xl font-semibold text-Neutral-Mild md:py-0.5 md:text-2xl lg:gap-10 lg:text-3xl">
      <button
        className={`border-b-2  ${
          selectedOption == "Rated" ? " font-bold text-Neutral-Strong" : ""
        }`}
        onClick={() => {
          handleOptionClick("Rated");
          setCurrentPage(1);
        }}
      >
        Rated
      </button>
      <button
        className={`border-b-2  ${
          selectedOption == "Doing" ? "font-bold text-Neutral-Strong" : ""
        }`}
        onClick={() => {
          handleOptionClick("Doing");
          setCurrentPage(1);
        }}
      >
        Engaging
      </button>
      <button
        className={`border-b-2  ${
          selectedOption == "Wishlist" ? "font-bold text-Neutral-Strong" : ""
        }`}
        onClick={() => {
          handleOptionClick("Wishlist");
          setCurrentPage(1);
        }}
      >
        Wishlist
      </button>
      <button
        className={`border-b-2  ${
          selectedOption == "Reviewed" ? "font-bold text-Neutral-Strong" : ""
        }`}
        onClick={() => {
          handleOptionClick("Reviewed");
          setCurrentPage(1);
        }}
      >
        Reviewed
      </button>
    </div>
  );
}
