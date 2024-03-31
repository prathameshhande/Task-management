import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Taskedit from "./Taskedit";
import Taskdelete from "./Taskdelete";
import { removeTask } from "../features/TaskSlice";

function Tasks({ tasks }) {
  const [selectedTaskForEdit, setSelectedTaskForEdit] = useState(null);
  const [selectedTaskForDelete, setSelectedTaskForDelete] = useState(null);
  const dispatch = useDispatch();

  const handleEditTask = (taskId) => {
    setSelectedTaskForEdit(taskId);
  };

  const handleRemoveTask = (taskId) => {
    setSelectedTaskForDelete(taskId);
  };

  const handleCancelEdit = () => {
    setSelectedTaskForEdit(null);
  };

  const handleCancelDelete = () => {
    setSelectedTaskForDelete(null);
  };

  const handleConfirmDelete = (taskId) => {
    dispatch(removeTask({ id: taskId }));
    setSelectedTaskForDelete(null);
  };

  const getBackgroundColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-gray-500";
      case "In Progress":
        return "bg-orange-500";
      case "Completed":
        return "bg-green-500";
      case "Deployed":
        return "bg-blue-500";
      case "Deferred":
        return "bg-yellow-500";
      default:
        return "bg-transparent";
    }
  };

  return (
    <div className="flex flex-wrap  bg-gray-700 text-white">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
        >
          <div className="border-2 border-black p-4 flex flex-col">
            <div
              className={`${getBackgroundColor(
                task.status
              )} p-2 rounded-lg w-full mb-3`}
            >
              <h1 className="flex justify-center">{task.status}</h1>
            </div>
            <div className="flex flex-row items-center mb-4 ">
              <h2 className="text-4xl">{task.title}</h2>
              <p className="ml-auto mb-0 p-2 rounded-lg  bg-blue-600">
                {task.priority}
              </p>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-80 border-t border-black"></div>
            </div>
            <div className="mb-6 text-xl ">
              <p>{task.description}</p>
              <div className="flex flex-row items-center mb-4 text-xl">
                <h2>{task.assignee}</h2>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                disabled
              >
                {task.status}
              </button>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                onClick={() => handleRemoveTask(task.id)}
              >
                Remove Task
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => handleEditTask(task.id)}
              >
                Edit Task
              </button>
            </div>
          </div>
        </div>
      ))}
      {selectedTaskForEdit && (
        <Taskedit
          task={tasks.find((task) => task.id === selectedTaskForEdit)}
          onClose={handleCancelEdit}
        />
      )}
      {selectedTaskForDelete && (
        <Taskdelete
          task={tasks.find((task) => task.id === selectedTaskForDelete)}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default Tasks;
