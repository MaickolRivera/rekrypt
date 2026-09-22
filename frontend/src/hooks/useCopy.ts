import { useState } from "react";

export const useCopy = (resetDelay = 1500) => {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetDelay);
    } catch (error) {
      console.log("Error copying text ", error);
    }
  };

  return { copied, copy };
};
