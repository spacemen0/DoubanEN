import {Link} from "react-router-dom";

export function MenuItem({
                           link,
                           text,
                           isLast = false,
                           onClick,
                         }: {
  link: string;
  text: string;
  isLast?: boolean;
  onClick?: () => void;
}) {
  const borderClass = isLast ? "" : "border-b border-gray-300";

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to={link}
      className={`block px-2 py-2 text-sm ${borderClass} hover:bg-gray-100`}
      onClick={handleClick}
    >
      {text}
    </Link>
  );
}
