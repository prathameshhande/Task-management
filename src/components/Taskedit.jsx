import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../features/TaskSlice";
import { DatePicker } from "antd";
import moment from "moment";

function Taskedit({ task, onClose }) {
  // Initialize state variables with task properties
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [startDate, setStartDate] = useState(moment(task.startDate));
  const [endDate, setEndDate] = useState(moment(task.endDate));

  const dispatch = useDispatch();

  const editTaskHandler = (e) => {
    e.preventDefault();

    dispatch(
      editTask({
        id: task.id,
        title: task.title,
        description: task.description,
        team: task.team,
        assignee: task.assignee,
        priority: priority,
        status: status,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      })
    );

    onClose(); // Close the Taskedit component
  };

  return (
    <>
      <form onSubmit={editTaskHandler}>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-2/8 h-3/8 border-2 border-black  bg-gray-700 ">
          <div className="flex flex-row">
            <h1 className="font-bold sm:ml-10 mt-2 mb-2 text-xl text-white">
              Task Edit
            </h1>
            <button
              className="bg-black py-2 px-3 text-white mt-2 ml-40 "
              type="button"
              onClick={onClose}
            >
              close
            </button>
          </div>

          <label className="sm:ml-10 mt-2 text-white" htmlFor="text">
            Title:
          </label>
          <input
            className="border-2 border-black w-80 h-7 sm:ml-10 mt-2 text-black"
            type="text"
            value={task.title}
            readOnly
          />
          <label className="sm:ml-10 mt-2 text-white" htmlFor="text">
            Description:
          </label>
          <textarea
            className="border-2 border-black w-80 h-20 sm:ml-10 mt-2 text-black"
            value={task.description}
            readOnly
          ></textarea>
          <label className="sm:ml-10 mt-2 text-white" htmlFor="text">
            Team:
          </label>
          <input
            className="border-2 border-black w-80 h-7 sm:ml-10 mt-2 text-black"
            type="text"
            value={task.team}
            readOnly
          />
          <label className="sm:ml-10 mt-2 text-white" htmlFor="text">
            Assignee :
          </label>
          <input
            className="border-2 border-black w-80 h-7 sm:ml-10 mt-2 text-black"
            type="text"
            value={task.assignee}
            readOnly
          />

          <div className="flex flex-row sm:ml-10 mt-2">
            <div className="m-4">
              <label className="text-white" htmlFor="">
                Priority:
              </label>
              <select
                className="m-2 text-black"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
            <div className="m-4">
              <label className="text-white" htmlFor="">
                Status:
              </label>
              <select
                className="m-2 text-black"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Deployed">Deployed</option>
                <option value="Deffered">Deffered</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row sm:ml-4 mt-2">
            <div className="m-4">
              <label className="text-white" htmlFor="">
                Start Date:
              </label>
              <DatePicker
                className="m-2"
                value={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="m-4">
              <label className="text-white" htmlFor="">
                End Date:
              </label>
              <DatePicker
                className="m-2"
                value={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>

          <div className="flex flex-row sm:ml-10 mt-2">
            <button
              className="bg-black text-white  py-2 px-3 ml-4"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-black text-white  py-2 px-3 ml-20"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Taskedit;
