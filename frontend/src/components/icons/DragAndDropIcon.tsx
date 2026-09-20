import React from "react";

const DragAndDropIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className="w-5.5 h-5.5 text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      d="M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01"
    />
  </svg>
);

export default DragAndDropIcon;
