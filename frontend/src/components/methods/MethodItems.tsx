import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragAndDropIcon from "../icons/DragAndDropIcon";
import AddIcon from "../icons/AddIcon";
import RemoveIcon from "../icons/RemoveIcon";

interface MethodItemProps {
  method: string;
  // Click action: remove it (ACTIVE item) or add it (AVAILABLE item)
  onToggle: (method: string) => void;
}

interface ActiveItemProps extends MethodItemProps {
  isFinal?: boolean;
}

export const ActiveItem = ({ method, onToggle, isFinal = false }: ActiveItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: method });

  return (
    <li
      // ref + listeners + attributes make the whole row draggable;
      // style applies the movement while it is being dragged
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      title={isFinal ? `${method} — produces the final output` : undefined}
      className={`flex flex-row items-center gap-2 py-3.5 lg:py-2.5 pl-3.5 pr-3 w-full rounded-md cursor-grab hover:bg-background ${
        isFinal ? "outline-1 outline-accent/40 bg-accent/10" : ""
      } ${isDragging ? "opacity-40" : ""}`}
      {...attributes}
      {...listeners}
    >
      <span className="flex-shrink-0">
        <DragAndDropIcon />
      </span>
      <span className="flex-1 truncate">{method}</span>
      {isFinal && (
        <span className="flex-shrink-0 px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase rounded text-accent bg-accent/15">
          TOP
        </span>
      )}
      <button
        type="button"
        className="flex-shrink-0 cursor-pointer"
        aria-label={`Remove ${method}`}
        // Without this, pressing the button would start a drag of the row
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onToggle(method)}
      >
        <RemoveIcon />
      </button>
    </li>
  );
};

// Item of the AVAILABLE list. It can only be dragged (it does not reorder
// anything), so the simpler useDraggable is enough.
export const AvailableItem = ({ method, onToggle }: MethodItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: method,
  });

  return (
    <li
      ref={setNodeRef}
      className={`flex flex-row items-center gap-4 py-2.5 lg:py-2.5 px-4 rounded-md cursor-grab hover:bg-background ${
        isDragging ? "opacity-40" : ""
      }`}
      onClick={() => onToggle(method)}
      {...attributes}
      {...listeners}
    >
      <span className="flex-shrink-0">
        <AddIcon />
      </span>
      <span className="truncate">{method}</span>
    </li>
  );
};
