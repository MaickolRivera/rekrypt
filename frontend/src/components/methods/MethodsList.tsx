import { createPortal } from "react-dom";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DragAndDropIcon from "../icons/DragAndDropIcon";
import DropZone from "./DropZone";
import { ActiveItem, AvailableItem } from "./MethodItems";
import { useMethods } from "./useMethods";
import { ACTIVE, AVAILABLE, useMethodsDnd } from "./useMethodsDnd";

interface MethodsListProps {
  selectedMethods: string[];
  onMethodsChange: (selectedMethods: string[]) => void;
}

const MethodsList = ({
  selectedMethods,
  onMethodsChange,
}: MethodsListProps) => {
  const methods = useMethods();
  // Drag logic lives in the hook; see useMethodsDnd.ts
  const { dndProps, draggingId, isDropTarget } = useMethodsDnd(
    selectedMethods,
    onMethodsChange
  );

  const availableMethods = methods.filter((m) => !selectedMethods.includes(m));

  const addMethod = (method: string) =>
    onMethodsChange([...selectedMethods, method]);

  const removeMethod = (method: string) =>
    onMethodsChange(selectedMethods.filter((m) => m !== method));

  return (
    <DndContext {...dndProps}>
      <div className="flex flex-col items-center text-sm lg:text-xs xl:text-sm">
        <DropZone id={ACTIVE} title="ACTIVE" highlighted={isDropTarget(ACTIVE)}>
          {/* Lets the items of this list reorder themselves while dragging */}
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
                  onToggle={removeMethod}
                />
              ))
            )}
          </SortableContext>
        </DropZone>

        <DropZone
          id={AVAILABLE}
          title="AVAILABLE"
          highlighted={isDropTarget(AVAILABLE)}
        >
          {availableMethods.map((method) => (
            <AvailableItem key={method} method={method} onToggle={addMethod} />
          ))}
        </DropZone>
      </div>

      {/* Floating copy that follows the pointer while dragging */}
      {/* Rendered in document.body: inside the sidebar it would be clipped by its overflow*/}
      {createPortal(
        <DragOverlay>
          {draggingId && (
            <div className="flex flex-row items-center gap-3 py-2.5 pl-4 pr-3 rounded-md cursor-grabbing bg-background outline-1 outline-stroke font-display text-base-white text-sm lg:text-xs xl:text-sm">
              <DragAndDropIcon />
              <span className="truncate">{draggingId}</span>
            </div>
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default MethodsList;
