import { useState } from "react";
import MethodList from "../components/methods/MethodsList";
import RemoveIcon from "../components/icons/RemoveIcon";
import MenuIcon from "../components/icons/MenuIcon";

interface SidebarProps {
  methods: string[];
  selectedMethods: string[];
  onMethodsChange: (methods: string[]) => void;
}

function Sidebar({ methods, selectedMethods, onMethodsChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <div className="absolute z-30 flex flex-row gap-5 top-9 left-11 lg:hidden">
          <button
            type="button"
            className="flex cursor-pointer"
            aria-label="Open methods menu"
            aria-expanded={isOpen}
            aria-controls="methods-sidebar"
            onClick={() => setIsOpen(true)}
          >
            <MenuIcon className="w-7 h-7" />
          </button>
          <p className="text-2xl font-bold lg:text-xl xl:text-2xl">REKRYPT</p>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-background/60 lg:hidden"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* When closed on mobile it is hidden (not just moved off-screen) so
          its buttons can't be reached with the keyboard */}
      <aside
        id="methods-sidebar"
        aria-label="Encryption methods"
        className={`fixed top-0 left-0 z-30 overflow-x-hidden overflow-y-auto scroll-bar-custom
            bg-sidebar transform transition-[transform,visibility] duration-300 ease-in-out
            h-full w-72 lg:w-105 flex flex-col gap-10 lg:gap-8
        ${
          isOpen ? "translate-x-0" : "translate-x-[-100%] invisible lg:visible"
        } lg:translate-x-0 lg:relative`}
      >
        <div className="flex flex-row items-center gap-5 pt-9 px-11 lg:pt-10 lg:justify-center">
          <button
            type="button"
            className="flex cursor-pointer lg:hidden"
            aria-label="Close methods menu"
            onClick={() => setIsOpen(false)}
          >
            <RemoveIcon className="w-7 h-7" />
          </button>
          <p className="text-2xl font-bold lg:text-2xl">REKRYPT</p>
        </div>

        <MethodList
          methods={methods}
          selectedMethods={selectedMethods}
          onMethodsChange={onMethodsChange}
        />
      </aside>
    </>
  );
}

export default Sidebar;
