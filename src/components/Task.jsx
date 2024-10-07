import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index, columnId, handleEditTask, handleDeleteTask }) => {
  const getTaskBackgroundColor = (columnId) => {
    switch (columnId) {
      case "todo":
        return "bg-green-300";
      case "inProgress":
        return "bg-blue-300";
      case "done":
        return "bg-red-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${getTaskBackgroundColor(
            columnId
          )} shadow-sm rounded-lg p-4 border border-gray-200 hover:bg-opacity-90 hover:shadow-md transition duration-300 ease-in-out`}
        >
          <h3 className="font-medium text-indigo-800 mb-2">{task.name}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => handleEditTask(task.id, columnId)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTask(task.id, columnId)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
