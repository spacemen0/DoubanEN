import { useEffect, useRef } from "react";
import { useAuthStore } from "./AuthStore.ts";

const MessageBox = () => {
  const message = useAuthStore((state) => state.message);
  const setMessage = useAuthStore((state) => state.setMessage);
  const messageBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let timer: number;
    let flag = false;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;

      // Only check for target outside the messageBoxRef if it's a valid reference
      if (messageBoxRef.current && !messageBoxRef.current.contains(target)) {
        // Fade out the message box and clear the message after timeout
        messageBoxRef.current.classList.remove("opacity-100");
        messageBoxRef.current.classList.add("opacity-0");

        const timer = setTimeout(() => {
          setMessage(""); // clears the message after the timeout
        }, 500);
        flag = true;
        // Clear the timer on cleanup (you can store the timer if you need to clear it later)
        return () => clearTimeout(timer);
      }
    };

    document.addEventListener("mouseover", handleOutsideClick); // use mousedown to detect click events
    return () => {
      document.removeEventListener("mouseover", handleOutsideClick);
      flag && clearTimeout(timer!); // clear the timer on cleanup
    };
  }, [setMessage]);

  return (
    message && (
      <div
        ref={messageBoxRef}
        className="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform
        px-4 py-2 md:py-4 rounded-md bg-gray-500 text-white transition-opacity duration-[500ms] opacity-100"
      >
        <p className="text-center text-xl font-semibold">{message}</p>
      </div>
    )
  );
};

export default MessageBox;
