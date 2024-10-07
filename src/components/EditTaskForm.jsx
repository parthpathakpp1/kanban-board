import React from "react";

const EditTaskForm = ({ editingTask, setEditingTask, handleSaveEdit }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <input
        type="text"
        value={editingTask.name}
        onChange={(e) =>
          setEditingTask({ ...editingTask, name: e.target.value })
        }
        className="border rounded-lg px-4 py-2 mb-2"
        placeholder="Task Name"
      />
      <input
        type="text"
        value={editingTask.description}
        onChange={(e) =>
          setEditingTask({
            ...editingTask,
            description: e.target.value,
          })
        }
        className="border rounded-lg px-4 py-2 mb-2"
        placeholder="Task Description"
      />
      <button
        onClick={handleSaveEdit}
        className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
      >
        Save
      </button>
      <button
        onClick={() => setEditingTask(null)}
        className="bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Cancel
      </button>
    </div>
  );
};

export default EditTaskForm;
