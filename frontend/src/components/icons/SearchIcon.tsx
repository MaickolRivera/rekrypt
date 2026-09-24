import React from "react";

interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  className = "",
  ...props
}) => (
  <svg
    className={`w-4 h-4 text-subtext ${className}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="2" />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      d="m20 20-4.35-4.35"
    />
  </svg>
);

export default SearchIcon;
