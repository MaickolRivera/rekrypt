import { useState } from "react";
import MethodList from "../components/methods/MethodsList";
import RemoveIcon from "../components/icons/RemoveIcon";
import MenuIcon from "../components/icons/MenuIcon";

interface SidebarProps {
  selectedMethods: string[];
  onMethodsChange: (methods: string[]) => void;
}

function Sidebar({ selectedMethods, onMethodsChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <div className="absolute z-30 flex flex-row gap-5 top-9 left-11 lg:hidden">
          <MenuIcon
            className="cursor-pointer w-7 h-7"
            onClick={() => setIsOpen(true)}
          />
          <h2 className="text-2xl font-bold lg:text-xl xl:text-2xl">REKRYPT</h2>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-background/60 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <section
        className={`fixed top-0 left-0 z-30 overflow-x-hidden overflow-y-auto scroll-bar-custom
            bg-sidebar transform transition-transform duration-300 ease-in-out 
            h-full w-72 lg:w-105 flex flex-col gap-10 lg:gap-8
        ${
          isOpen ? "translate-x-0" : "translate-x-[-100%]"
        } lg:translate-x-0 lg:relative`}
      >
        <div className="flex flex-row items-center gap-5 pt-9 px-11 lg:pt-10 lg:justify-center">
          <RemoveIcon
            className="cursor-pointer w-7 h-7 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <h2 className="text-2xl font-bold lg:text-2xl">REKRYPT</h2>
        </div>

        <MethodList
          selectedMethods={selectedMethods}
          onMethodsChange={onMethodsChange}
        />
      </section>
    </>
  );
}

export default Sidebar; 