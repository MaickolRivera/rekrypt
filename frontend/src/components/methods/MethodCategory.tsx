import { useState } from "react";
import ChevronIcon from "../icons/ChevronIcon";
import { AvailableItem } from "./MethodItems";

interface MethodCategoryProps {
  name: string;
  methods: string[];
  onToggle: (method: string) => void;
  // True while a search query is active: expands the category regardless of
  // its own collapsed state, without losing that state once the query clears.
  forceOpen?: boolean;
}

const MethodCategory = ({ name, methods, onToggle, forceOpen = false }: MethodCategoryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const open = isOpen || forceOpen;

  return (
    <li className="flex flex-col">
      <button
        type="button"
        className="flex flex-row items-center w-full gap-2 py-2 pl-1 pr-2 rounded-md cursor-pointer text-subtext hover:text-base-white hover:bg-background"
        aria-expanded={open}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="flex-1 font-medium text-left truncate">{name}</span>
        <ChevronIcon className={open ? "rotate-90" : ""} />
      </button>

      {open && (
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
