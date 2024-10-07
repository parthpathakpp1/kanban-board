import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Column = ({ column, handleEditTask, handleDeleteTask }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
      <h2 className="font-semibold mb-4 text-xl text-indigo-700">
        {column.title}
      </h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[250px] space-y-3"
          >
            {column.tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                columnId={column.id}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
