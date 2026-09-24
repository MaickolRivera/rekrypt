import { useId } from "react";
import CopyIcon from "./icons/CopyIcon";
import CheckIcon from "./icons/CheckIcon";
import { useCopy } from "../hooks/useCopy";

interface InputTextProps {
    label: string;
    value: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readOnly?: boolean;
    copyable?: boolean;
  }

  const InputText: React.FC<InputTextProps> = ({
    label,
    value,
    placeholder,
    onChange,
    readOnly = false,
    copyable = false,
  }) => {
    const id = useId();
    const { copied, copy } = useCopy();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = event.target.value;
  
      const hasHTML = /<\/?[a-z][\s\S]*>/i.test(inputValue);
  
      if (!hasHTML && onChange) {
        onChange(event);
      } else {
        alert("No se permiten etiquetas HTML en el texto.");
      }
    };
  
    return (
      <div className="relative flex flex-col gap-3 p-4 my-2 border-2 border-stroke rounded-xl h-full focus-within:border-white/20">
        <label htmlFor={id} className="text-xs font-medium text-subtext">
          <span aria-hidden="true">&gt; </span>
          {label}
        </label>
        <textarea
          id={id}
          className={`h-full resize-none scroll-bar-custom focus:outline-hidden text-subtext ${
            copyable ? "pr-8" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
        />
        {copyable && (
          <button
            type="button"
            className="absolute bottom-3 right-3 p-1.5 rounded-md text-subtext cursor-pointer hover:text-base-white hover:bg-stroke disabled:opacity-40 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-subtext"
            onClick={() => copy(value)}
            disabled={!value}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            title={copied ? "Copied!" : "Copy"}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        )}
      </div>
    );
  };
  
  
  export default InputText;