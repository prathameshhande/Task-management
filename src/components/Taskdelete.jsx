import React from "react";
import { useDispatch } from "react-redux";
import { removeTask } from "../features/TaskSlice";

function Taskdelete({ task, onCancel, onConfirm }) {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    if (task.status !== "Completed") {
      dispatch(removeTask({ id: task.id }));
    }
    onCancel(); // Close the Taskdelete component and the popup window
  };

  const handleCancel = () => {
    onCancel(); // Close the Taskdelete component and the popup window when clicking the "X" button or "No" button
  };

  if (!task) {
    return null; // Render nothing if task is not defined
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-gray-700 text-white p-8 border-2 border-black">
      <h1 className="text-xl font-bold mb-4">Delete Task</h1>
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
        onClick={handleCancel} // Close the Taskdelete component and the popup window when clicking the "X" button
      >
        X
      </button>
      <h1 className="text-lg mb-4">
        {task.status === "Completed"
          ? "Completed task can't be deleted!"
          : "Do you wish to delete the task?"}
      </h1>

      <h2 className="text-lg font-bold mb-4">Title: {task.title}</h2>
      <div className="flex flex-row">
        {task.status !== "Completed" && ( // Check if the task status is not "Completed"
          <div className="flex ">
            <button
              className="bg-red-500 text-white py-2 px-4 mr-2 rounded"
              onClick={handleDeleteTask}
            >
              Yes
            </button>
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
            onClick={handleCancel} // Close the Taskdelete component and the popup window when clicking the "No" button
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Taskdelete;
