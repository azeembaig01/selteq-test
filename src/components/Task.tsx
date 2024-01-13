// Task.tsx
import React, { useState, useRef } from "react";
import {
  useDrag,
  useDrop,
  DropTargetMonitor,
  DragSourceMonitor,
} from "react-dnd";

export const ItemTypes = {
  TASK: "task",
};

interface TaskProps {
  task: { id: number; text: string };
  onDelete: () => void;
  onEdit: (newText: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

const Task: React.FC<TaskProps> = ({
  task,
  onDelete,
  onEdit,
  onMove,
  index,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id, index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover: (
      item: { id: number; index: number },
      monitor: DropTargetMonitor
    ) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEdit(editedText);
    setEditing(false);
  };

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {editing ? (
        <div className="addtodolist">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="addtodolist" style={{ backgroundColor: "#d1eaed" }}>
          {task.text}
          <div className="listbutton">
            <button className="editbutton" onClick={handleEdit}>
              Edit
            </button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
