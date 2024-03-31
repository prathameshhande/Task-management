import React, { useState, useEffect } from "react";
import DateComponent from "./Date";
import Taskadd from "./Taskadd";
import Tasks from "./Tasks"; // Importing Tasks component
import { useSelector } from "react-redux";

function Display() {
  const [showAddTask, setShowAddTask] = useState(false);
  const tasks = useSelector((state) => state.task.tasks); // Assuming you have tasks in your Redux store

  const [filterName, setFilterName] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [sortByPriority, setSortByPriority] = useState("");

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleFilterPriorityChange = (event) => {
    setFilterPriority(event.target.value);
  };

  const handleSortByPriorityChange = (event) => {
    setSortByPriority(event.target.value);
  };

  // Filter tasks based on assignee name and priority
  const filteredTasks = tasks.filter((task) => {
    const assigneeMatch =
      !filterName ||
      task.assignee.toLowerCase().includes(filterName.toLowerCase());
    const priorityMatch = !filterPriority || task.priority === filterPriority;
    return assigneeMatch && priorityMatch;
  });

  useEffect(() => {}, [filteredTasks]);

  // Sort tasks based on priority if sortByPriority is true
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortByPriority === "P0") {
      if (a.priority === "P0" && b.priority !== "P0") {
        return -1; // Place tasks with priority P0 first
      } else if (a.priority !== "P0" && b.priority === "P0") {
        return 1; // Place tasks with priority P0 last
      }
    } else if (sortByPriority === "P1") {
      if (a.priority === "P1" && b.priority !== "P1") {
        return -1; // Place tasks with priority P1 first
      } else if (a.priority !== "P1" && b.priority === "P1") {
        return 1; // Place tasks with priority P1 last
      }
    } else if (sortByPriority === "P2") {
      if (a.priority === "P2" && b.priority !== "P2") {
        return -1; // Place tasks with priority P2 first
      } else if (a.priority !== "P2" && b.priority === "P2") {
        return 1; // Place tasks with priority P2 last
      }
    }

    // If priorities are equal or sortByPriority is not specified, maintain current order
    return 0;
  });

  const handleAddTaskClick = () => {
    setShowAddTask(true);
  };

  const handleCloseTaskAdd = () => {
    setShowAddTask(false);
  };

  return (
    <>
      <div className="flex flex-wrap bg-gray-700 ">
        <h1 className="font-bold sm:ml-10 m-5 mb-2 text-sm text-white">
          Filter By:
        </h1>
        <div className="m-5">
          <input
            className="border-2 border-black"
            type="text"
            name="filterName"
            placeholder="Assignee Name"
            value={filterName}
            onChange={handleFilterNameChange}
          />
        </div>
        <div className="  m-5 ">
          <select value={filterPriority} onChange={handleFilterPriorityChange}>
            <option>Filter By Priority</option>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>
        <div>
          <DateComponent />
        </div>
        <div className="m-5">
          <button
            className="bg-black text-white py-2 px-4 rounded-full"
            type="button"
            onClick={handleAddTaskClick}
          >
            Add New Task
          </button>
        </div>
      </div>
      {showAddTask && <Taskadd onClose={handleCloseTaskAdd} />}
      <div className=" flex flex-wrap bg-gray-700 ">
        <h1 className="font-bold sm:ml-10 mt-5 m-5 mb-2 text-white text-sm">
          Sort By:
        </h1>
        <div className="m-5">
          <select value={sortByPriority} onChange={handleSortByPriorityChange}>
            <option value="">Sort By Priority</option>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>
      </div>
      <Tasks tasks={sortedTasks} /> {/* Rendering filtered and sorted tasks */}
    </>
  );
}

export default Display;
