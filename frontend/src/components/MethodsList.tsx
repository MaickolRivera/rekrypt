import { useState, useEffect } from "react";
import { axiosAPI } from "../api/axios.ts";
import DragAndDropIcon from "./icons/DragAndDropIcon.tsx";
import AddIcon from "./icons/AddIcon.tsx";
import RemoveIcon from "./icons/RemoveIcon.tsx";
import { motion } from "framer-motion";

interface MethodsListProps {
  selectedMethods: string[];
  onMethodsChange: (selectedMethods: string[]) => void;
}

const MethodsList = ({
  selectedMethods,
  onMethodsChange,
}: MethodsListProps) => {
  const [methods, setMethods] = useState<string[]>([]);

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const response = await axiosAPI.get("/methods");
        const methodsArray = response.data.methods;
        setMethods(methodsArray || []);
      } catch (error) {
        console.log("Error fetching methods: ", error);
      }
    };
    fetchMethods();
  }, []);

  const handleMethodSelect = (method: string) => {
    const updatedMethods = selectedMethods.includes(method)
      ? selectedMethods.filter((m) => m !== method)
      : [...selectedMethods, method];
    onMethodsChange(updatedMethods);
  };

  return (
    <div className="flex flex-col items-center gap-6 text-sm lg:text-xs xl:text-sm">
      <ul className="flex flex-col w-48 gap-1 lg:w-46">
        <li className="pb-2 font-medium text-subtext w-36">ACTIVE</li>
        {selectedMethods.length === 0 ? (
          <li className="py-4 pl-4 text-subtext">No methods selected</li>
        ) : (
          selectedMethods.map((method, index) => (
            <motion.li
              className={`flex flex-row items-center gap-3 py-3.5 lg:py-2.5  pl-3.5 pr-3 w-full rounded-xl hover:bg-background`}
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.45 }}
            >
              <span className="flex-shrink-0">
                <DragAndDropIcon></DragAndDropIcon>
              </span>
              <span className="truncate">{method}</span>
            </motion.li>
          ))
        )}
      </ul>

      <ul className="flex flex-col w-48 gap-2 pb-5 lg:w-46">
        <li className="pb-2 font-medium text-subtext ">AVAILABLE</li>
        {methods.map((method, index) => (
          <li
            className={`flex flex-row items-center gap-3 py-2.5 lg:py-2.5 pl-4 pr-3 rounded-lg cursor-pointer hover:bg-background
    ${selectedMethods.includes(method) ? "outline-1 outline-stroke" : ""}`}
            key={index}
            onClick={() => handleMethodSelect(method)}
          >
            <span className="flex-shrink-0">
              {selectedMethods.includes(method) ? <RemoveIcon /> : <AddIcon />}
            </span>
            <span className="truncate">{method}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MethodsList;
