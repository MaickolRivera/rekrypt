import { useState } from "react";
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  pointerWithin,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

// Drag and drop between the ACTIVE and AVAILABLE lists.
//
// The only source of truth is `selectedMethods` (owned by App). A drag never
// moves items by itself: on drop we compute a new `selectedMethods` array and
// hand it to `onMethodsChange`. Both lists are then re-rendered from it, and
// the backend receives the methods in that same order.

// Ids of the two drop zones. Item ids are the method names themselves.
export const ACTIVE = "active";
export const AVAILABLE = "available";

export type Zone = typeof ACTIVE | typeof AVAILABLE;

// Prefer the element under the pointer
//  fall back to the closest one
const collisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);
  return pointerCollisions.length > 0 ? pointerCollisions : closestCenter(args);
};

// Which list an id belongs to. No need to store it: an item is in ACTIVE if
// it is in `selected` (or if the id is the ACTIVE zone itself), else AVAILABLE.
const zoneOf = (selected: string[], id: string): Zone =>
  id === ACTIVE || selected.includes(id) ? ACTIVE : AVAILABLE;

// Core logic: given what was dragged (`id`) and what was under it when dropped
// (`overId`, an item or a zone), returns the new list of active methods, or
// null when nothing changes.

const applyDrop = (
  selected: string[],
  id: string,
  overId: string
): string[] | null => {
  const from = zoneOf(selected, id);
  const to = zoneOf(selected, overId);

  // Dropped on AVAILABLE: remove it from ACTIVE (or ignore if it was already there)
  if (to === AVAILABLE) {
    return from === ACTIVE ? selected.filter((m) => m !== id) : null;
  }

  // Dropped on ACTIVE: `target` is the position of the item it landed on,
  // or the end of the list if it landed on the empty area of the zone
  const target =
    overId === ACTIVE ? selected.length : selected.indexOf(overId);

  // AVAILABLE -> ACTIVE: insert at `target`
  if (from === AVAILABLE) {
    return [...selected.slice(0, target), id, ...selected.slice(target)];
  }

  // ACTIVE -> ACTIVE: reorder. Landing on the empty area means "move to the end"
  const oldIndex = selected.indexOf(id);
  const newIndex = overId === ACTIVE ? selected.length - 1 : target;
  return oldIndex === newIndex ? null : arrayMove(selected, oldIndex, newIndex);
};

interface DragState {
  id: string;
  overZone: Zone | null;
}

export const useMethodsDnd = (
  selectedMethods: string[],
  onMethodsChange: (methods: string[]) => void
) => {
  const [drag, setDrag] = useState<DragState | null>(null);

  // How a drag starts. The constraints keep clicks working on mouse (must move
  // 5px first) and keep the sidebar scrollable on touch (long press first).
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // 1. Picked up an item
  const onDragStart = ({ active }: DragStartEvent) =>
    setDrag({ id: String(active.id), overZone: null });

  // 2. Moving over something: remember which list it is (highlight only)
  const onDragOver = ({ over }: DragOverEvent) =>
    setDrag((d) =>
      d && { ...d, overZone: over ? zoneOf(selectedMethods, String(over.id)) : null }
    );

  // 3. Dropped: compute the new order and lift it to the parent
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setDrag(null);
    if (!over) return;

    const next = applyDrop(selectedMethods, String(active.id), String(over.id));
    if (next) onMethodsChange(next);
  };

  // Escape key or dropped outside: nothing changes
  const onDragCancel = () => setDrag(null);

  // A zone is highlighted when the dragged item would change lists by dropping there
  const isDropTarget = (zone: Zone) =>
    !!drag &&
    drag.overZone === zone &&
    zoneOf(selectedMethods, drag.id) !== zone;

  return {
    dndProps: {
      sensors,
      collisionDetection,
      onDragStart,
      onDragOver,
      onDragEnd,
      onDragCancel,
    },
    draggingId: drag?.id ?? null,
    isDropTarget,
  };
};
