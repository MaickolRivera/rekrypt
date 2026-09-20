import { useDroppable } from "@dnd-kit/core";
import type { Zone } from "./useMethodsDnd";

interface DropZoneProps {
  id: Zone;
  title: string;
  highlighted: boolean;
  children: React.ReactNode;
}

// A list that items can be dropped on. Its `id` is what `over` reports when
// something is dropped on the empty area of the list instead of on an item.
const DropZone = ({ id, title, highlighted, children }: DropZoneProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <ul
      ref={setNodeRef}
      className={`flex flex-col w-60 p-3.5 gap-1 rounded-xl transition-colors ${
        highlighted ? "outline-1 outline-stroke bg-background/40" : ""
      }`}
    >
      <li className="pb-2 font-medium text-subtext w-36">{title}</li>
      {children}
    </ul>
  );
};

export default DropZone;
