export const Notification = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-6 z-50 w-11/12 max-w-md sm:max-w-lg lg:max-w-xl">
      <p className="text-lg font-semibold text-gray-800">{message}</p>
      <div className="mt-4 flex flex-col space-y-2">
        <a
          href="http://148.100.78.171:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white font-medium py-2 px-4 rounded hover:bg-green-600 transition text-center"
        >
          Visit Self-Hosted Version
        </a>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
};
