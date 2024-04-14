const Alert = ({ message, type, onClose }) => {
  const backgroundColor = type === "green" ? "bg-green-300" : "bg-red-50";
  const borderColor = type === "green" ? "border-green-300" : "border-red-300";
  const textColor = type === "green" ? "text-green-800" : "text-red-800";
  const darkBackgroundColor =
    type === "green" ? "dark:bg-green-800" : "dark:bg-red-800";
  const darkTextColor =
    type === "green" ? "dark:text-green-400" : "dark:text-red-400";
  const darkBorderColor =
    type === "green" ? "dark:border-green-800" : "dark:border-red-800";

  return (
    <div
      className={`${backgroundColor} ${borderColor} ${textColor} ${darkBackgroundColor} ${darkTextColor} ${darkBorderColor} flex items-center p-4 mb-4 text-sm rounded-lg relative`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-4 h-4 fill-current me-3"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8 a1 1 0 0 1 0-2h2 a1 1 0 0 1 1 1v4h1 a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="flex-grow">
        <span className="font-medium">Success alert!</span> {message}
      </div>
      <button
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <svg
          className="w-6 h-6 text-red-500 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 1 1-1.697 1.697L10 13.697l-2.651 2.849a1.2 1.2 0 1 1-1.697-1.697L8.303 12 5.651 9.148a1.2 1.2 0 1 1 1.697-1.697L10 10.303l2.651-2.852a1.2 1.2 0 1 1 1.697 1.697L11.697 12l2.651 2.849z" />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
