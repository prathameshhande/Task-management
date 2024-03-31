import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/TaskSlice";
import { DatePicker } from "antd";
import moment from "moment";

function Taskadd({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const addTaskHandler = (e) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !team ||
      !assignee ||
      !priority ||
      !status ||
      !startDate ||
      !endDate
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!assignee.includes("@")) {
      setErrorMessage("Assignee must contain '@' symbol followed by name.");
      return;
    }

    dispatch(
      addTask({
        title,
        description,
        team,
        assignee,
        priority,
        status,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      })
    );

    setTitle("");
    setDescription("");
    setTeam("");
    setAssignee("");
    setPriority("");
    setStatus("");
    setStartDate(null);
    setEndDate(null);
    setErrorMessage("");

    onClose();
  };

  return (
    <>
      <form onSubmit={addTaskHandler}>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-2/8 h-3/8 border-2 border-black bg-gray-700 ">
          <div className="flex flex-row">
            <h1 className="font-bold sm:ml-10 mt-2 mb-2 text-xl text-white">
              Task
            </h1>
            <button
              className="bg-black py-2 px-3 text-white mt-2 ml-40"
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
            className="border-2 border-black w-80 h-7 sm:ml-10 mt-2 "
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Name"
          />
          <label className="sm:ml-10 mt-2 text-white" htmlFor="text">
            Description:
          </label>
          <textarea
            className="border-2 border-black w-80 h-20 sm:ml-10 mt-2"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label className="sm:ml-10 mt-2 text-white" htmlFor="text">
            Team:
          </label>
          <input
            className="border-2 border-black w-80 h-7 sm:ml-10 mt-2"
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            placeholder=" team name"
          />
          <label className="sm:ml-10 mt-2 text-white" htmlFor="text">
            Assignee :
          </label>
          <input
            className="border-2 border-black w-80 h-7 sm:ml-10 mt-2"
            type="text"
            value={assignee}
            onChange={(e) => {
              const value = e.target.value;
              setErrorMessage("");
              setAssignee(value);
            }}
            placeholder="@name"
          />
          {errorMessage && (
            <p className="text-red-500 sm:ml-10 mt-2">{errorMessage}</p>
          )}

          <div className="flex flex-row sm:ml-10 mt-2">
            <div className="m-4">
              <label className="text-white" htmlFor="">
                Priority:
              </label>
              <select
                className="m-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>select Priority</option>
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
                className="m-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>select Status</option>
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
              type="reset"
              onClick={() => {
                setTitle("");
                setDescription("");
                setTeam("");
                setAssignee("");
                setPriority("");
                setStatus("");
                setStartDate(null);
                setEndDate(null);
                setErrorMessage("");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Taskadd;
