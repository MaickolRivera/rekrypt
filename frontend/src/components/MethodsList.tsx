import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  pointerWithin,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { axiosAPI } from "../api/axios.ts";
import DragAndDropIcon from "./icons/DragAndDropIcon.tsx";
import AddIcon from "./icons/AddIcon.tsx";
import RemoveIcon from "./icons/RemoveIcon.tsx";

const ACTIVE = "active";
const AVAILABLE = "available";

type Zone = typeof ACTIVE | typeof AVAILABLE;

// Prefer the element under the pointer; fall back to the closest one
const collisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);
  return pointerCollisions.length > 0 ? pointerCollisions : closestCenter(args);
};

interface ActiveItemProps {
  method: string;
  onRemove: (method: string) => void;
}

const ActiveItem = ({ method, onRemove }: ActiveItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: method });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex flex-row items-center gap-3 py-3.5 lg:py-2.5 pl-3.5 pr-3 w-full rounded-xl cursor-grab hover:bg-background ${
        isDragging ? "opacity-40" : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <span className="flex-shrink-0">
        <DragAndDropIcon />
      </span>
      <span className="flex-1 truncate">{method}</span>
      <button
        type="button"
        className="flex-shrink-0 cursor-pointer"
        aria-label={`Remove ${method}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onRemove(method)}
      >
        <RemoveIcon />
      </button>
    </li>
  );
};

interface AvailableItemProps {
  method: string;
  onAdd: (method: string) => void;
}

const AvailableItem = ({ method, onAdd }: AvailableItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: method,
  });

  return (
    <li
      ref={setNodeRef}
      className={`flex flex-row items-center gap-3 py-2.5 lg:py-2.5 pl-4 pr-3 rounded-lg cursor-grab hover:bg-background ${
        isDragging ? "opacity-40" : ""
      }`}
      onClick={() => onAdd(method)}
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

interface DropZoneProps {
  id: Zone;
  highlighted: boolean;
  className: string;
  children: React.ReactNode;
}

const DropZone = ({ id, highlighted, className, children }: DropZoneProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <ul
      ref={setNodeRef}
      className={`${className} rounded-xl transition-colors ${
        highlighted ? "outline-1 outline-stroke bg-background/40" : ""
      }`}
    >
      {children}
    </ul>
  );
};

interface MethodsListProps {
  selectedMethods: string[];
  onMethodsChange: (selectedMethods: string[]) => void;
}

const MethodsList = ({
  selectedMethods,
  onMethodsChange,
}: MethodsListProps) => {
  const [methods, setMethods] = useState<string[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overZone, setOverZone] = useState<Zone | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

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

  const availableMethods = methods.filter((m) => !selectedMethods.includes(m));

  const zoneOf = (id: string): Zone =>
    id === ACTIVE || selectedMethods.includes(id) ? ACTIVE : AVAILABLE;

  const addMethod = (method: string, index = selectedMethods.length) => {
    onMethodsChange([
      ...selectedMethods.slice(0, index),
      method,
      ...selectedMethods.slice(index),
    ]);
  };

  const removeMethod = (method: string) => {
    onMethodsChange(selectedMethods.filter((m) => m !== method));
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setDraggingId(String(active.id));
  };

  const handleDragOver = ({ over }: DragOverEvent) => {
    setOverZone(over ? zoneOf(String(over.id)) : null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setDraggingId(null);
    setOverZone(null);
    if (!over) return;

    const id = String(active.id);
    const overId = String(over.id);
    const from = zoneOf(id);
    const to = zoneOf(overId);

    if (from === ACTIVE && to === ACTIVE) {
      const oldIndex = selectedMethods.indexOf(id);
      const newIndex =
        overId === ACTIVE
          ? selectedMethods.length - 1
          : selectedMethods.indexOf(overId);
      if (oldIndex !== newIndex) {
        onMethodsChange(arrayMove(selectedMethods, oldIndex, newIndex));
      }
    } else if (from === AVAILABLE && to === ACTIVE) {
      addMethod(
        id,
        overId === ACTIVE ? selectedMethods.length : selectedMethods.indexOf(overId)
      );
    } else if (from === ACTIVE && to === AVAILABLE) {
      removeMethod(id);
    }
  };

  const handleDragCancel = () => {
    setDraggingId(null);
    setOverZone(null);
  };

  const draggingFrom = draggingId ? zoneOf(draggingId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-col items-center gap-6 text-sm lg:text-xs xl:text-sm">
        <DropZone
          id={ACTIVE}
          highlighted={draggingFrom === AVAILABLE && overZone === ACTIVE}
          className="flex flex-col w-48 gap-1 lg:w-46"
        >
          <li className="pb-2 font-medium text-subtext w-36">ACTIVE</li>
          <SortableContext
            items={selectedMethods}
            strategy={verticalListSortingStrategy}
          >
            {selectedMethods.length === 0 ? (
              <li className="py-4 pl-4 text-subtext">No methods selected</li>
            ) : (
              selectedMethods.map((method) => (
                <ActiveItem
                  key={method}
                  method={method}
                  onRemove={removeMethod}
                />
              ))
            )}
          </SortableContext>
        </DropZone>

        <DropZone
          id={AVAILABLE}
          highlighted={draggingFrom === ACTIVE && overZone === AVAILABLE}
          className="flex flex-col w-48 gap-2 pb-5 lg:w-46"
        >
          <li className="pb-2 font-medium text-subtext ">AVAILABLE</li>
          {availableMethods.map((method) => (
            <AvailableItem key={method} method={method} onAdd={addMethod} />
          ))}
        </DropZone>
      </div>

      <DragOverlay>
        {draggingId ? (
          <div className="flex flex-row items-center gap-3 py-2.5 pl-4 pr-3 rounded-lg cursor-grabbing bg-background outline-1 outline-stroke">
            <DragAndDropIcon />
            <span className="truncate">{draggingId}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
export default MethodsList;
