import React, { useState } from "react";
import Taskedit from "./Taskedit";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleRemoveTask = (taskId) => {
    setTasks(
      tasks.filter((task) => task.id !== taskId || task.status !== "Completed")
    );
  };

  const handleEditTask = (task) => {
    setEditTaskId(task.id);
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
  };

  return (
    <>
      <div className="flex flex-wrap">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
          >
            <div className="border-2 border-black p-4">
              <h2>Title: {task.title}</h2>
              <p>Description: {task.description}</p>
              <p>Team: {task.team}</p>
              <p>Assignee: {task.assignee}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>
              <button onClick={() => handleRemoveTask(task.id)}>
                Remove Task
              </button>
              <button onClick={() => handleEditTask(task)}>Edit Task</button>
            </div>
          </div>
        ))}
      </div>
      {editTaskId && (
        <Taskedit
          task={tasks.find((task) => task.id === editTaskId)}
          onClose={handleCancelEdit}
        />
      )}
    </>
  );
}

export default Tasks;
