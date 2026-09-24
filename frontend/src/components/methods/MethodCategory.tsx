import { useState } from "react";
import ChevronIcon from "../icons/ChevronIcon";
import { AvailableItem } from "./MethodItems";

interface MethodCategoryProps {
  name: string;
  methods: string[];
  onToggle: (method: string) => void;
}

const MethodCategory = ({ name, methods, onToggle }: MethodCategoryProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <li className="flex flex-col">
      <button
        type="button"
        className="flex flex-row items-center w-full gap-2 py-2 pl-1 pr-2 rounded-md cursor-pointer text-subtext hover:text-base-white hover:bg-background"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="flex-1 font-medium text-left truncate">{name}</span>
        <ChevronIcon className={isOpen ? "rotate-90" : ""} />
      </button>

      {isOpen && (
        <ul className="flex flex-col gap-1 pl-2.5">
          {methods.map((method) => (
            <AvailableItem key={method} method={method} onToggle={onToggle} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MethodCategory;
