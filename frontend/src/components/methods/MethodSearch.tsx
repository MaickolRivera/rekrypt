import SearchIcon from "../icons/SearchIcon";
import RemoveIcon from "../icons/RemoveIcon";

interface MethodSearchProps {
  value: string;
  onChange: (value: string) => void;
}

// Filters the methods shown inside the AVAILABLE categories below it. Same
// row treatment as MethodCategory (padding, radius, subtext/hover colors) so
// it reads as part of the same list, just without a disclosure chevron.
const MethodSearch = ({ value, onChange }: MethodSearchProps) => (
  <li className="flex flex-row items-center w-full gap-2 py-2 pl-1 pr-2 rounded-md border-1 border-stroke text-subtext focus-within:text-base-white focus-within:bg-background">
    <SearchIcon className="flex-shrink-0" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search methods"
      aria-label="Search methods"
      className="flex-1 min-w-0 bg-transparent outline-hidden placeholder:text-subtext"
    />
    {value && (
      <button
        type="button"
        className="flex-shrink-0 cursor-pointer text-subtext hover:text-base-white"
        aria-label="Clear search"
        onClick={() => onChange("")}
      >
        <RemoveIcon className="w-3.5 h-3.5" />
      </button>
    )}
  </li>
);

export default MethodSearch;
