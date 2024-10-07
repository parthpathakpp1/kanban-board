import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskInput from "./TaskInput";
import EditTaskForm from "./EditTaskForm";
import Column from "./Column";

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: {
      id: "todo",
      title: "To Do",
      tasks: [],
    },
    inProgress: {
      id: "inProgress",
      title: "In Progress",
      tasks: [],
    },
    done: {
      id: "done",
      title: "Done",
      tasks: [],
    },
  });

  const [newTask, setNewTask] = useState({ name: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);

  // Add task functionality
  const addTask = () => {
    if (newTask.name && newTask.description) {
      const updatedColumns = {
        ...columns,
        todo: {
          ...columns.todo,
          tasks: [
            ...columns.todo.tasks,
            { id: Date.now().toString(), ...newTask },
          ],
        },
      };
      setColumns(updatedColumns);
      setNewTask({ name: "", description: "" });
    }
  };

  // Delete task functionality
  const handleDeleteTask = (taskId, columnId) => {
    const column = columns[columnId];
    const updatedTasks = column.tasks.filter((task) => task.id !== taskId);
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        tasks: updatedTasks,
      },
    });
  };

  // Edit task functionality
  const handleEditTask = (taskId, columnId) => {
    const column = columns[columnId];
    const taskToEdit = column.tasks.find((task) => task.id === taskId);
    setEditingTask({ ...taskToEdit, columnId });
  };

  // Save edited task
  const handleSaveEdit = () => {
    const column = columns[editingTask.columnId];
    const updatedTasks = column.tasks.map((task) =>
      task.id === editingTask.id
        ? {
            ...task,
            name: editingTask.name,
            description: editingTask.description,
          }
        : task
    );
    setColumns({
      ...columns,
      [editingTask.columnId]: {
        ...column,
        tasks: updatedTasks,
      },
    });
    setEditingTask(null);
  };

  // Drag and drop functionality
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks =
      source.droppableId === destination.droppableId
        ? sourceTasks
        : [...destColumn.tasks];
    const [removed] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceColumn, tasks: sourceTasks },
      [destination.droppableId]: { ...destColumn, tasks: destTasks },
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800 tracking-wide">
        Kanban Board
      </h1>

      <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />

      {editingTask && (
        <EditTaskForm
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          handleSaveEdit={handleSaveEdit}
        />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.values(columns).map((column) => (
            <Column
              key={column.id}
              column={column}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
