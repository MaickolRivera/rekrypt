import { useState } from "react";
import CopyIcon from "./icons/CopyIcon";
import CheckIcon from "./icons/CheckIcon";

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
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (error) {
        console.log("Error copying text ", error);
      }
    };

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
      <div className="relative flex flex-col gap-3 p-4.5 border-2 border-stroke rounded-xl h-full">
        <label className="text-xs font-medium text-subtext">{label}</label>
        <textarea
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
            onClick={handleCopy}
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