import React from "react";

interface ChevronIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({
  className = "",
  ...props
}) => (
  <svg
    className={`w-4 h-4 text-subtext transition-transform duration-150 ${className}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m9 6 6 6-6 6"
    />
  </svg>
);

export default ChevronIcon;
