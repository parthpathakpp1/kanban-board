import React from "react";

const TaskInput = ({ newTask, setNewTask, addTask }) => {
  return (
    <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <input
        type="text"
        placeholder="Task Name"
        value={newTask.name}
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        className="border rounded-lg px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-600"
      />
      <input
        type="text"
        placeholder="Task Description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        className="border rounded-lg px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-600"
      />
      <button
        onClick={addTask}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out w-full sm:w-auto shadow-md"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
