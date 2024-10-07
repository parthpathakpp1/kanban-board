import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialColumns = {
  todo: { id: "todo", title: "To Do", tasks: [] },
  inProgress: { id: "inProgress", title: "In Progress", tasks: [] },
  done: { id: "done", title: "Done", tasks: [] },
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState({ name: "", description: "" });

  useEffect(() => {
    const savedColumns = localStorage.getItem("kanbanColumns");
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

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
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceTasks,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destTasks,
      },
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800 tracking-wide">
        Kanban Board
      </h1>
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.values(columns).map((column) => (
            <div
              key={column.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
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
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-100 shadow-sm rounded-lg p-4 border border-gray-200 hover:bg-gray-50 hover:shadow-md transition duration-300 ease-in-out"
                          >
                            <h3 className="font-medium text-indigo-800 mb-2">
                              {task.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {task.description}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
