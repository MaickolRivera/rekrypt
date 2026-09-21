import React from "react";

const AddIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className="w-5 h-5 text-subtext"
    aria-hidden="true"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 12h14m-7 7V5"
    />
  </svg>
);

export default AddIcon;
