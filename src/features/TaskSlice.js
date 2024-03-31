import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid"; // Import nanoid function

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

export const TaskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: nanoid(), // Generate unique ID for the new task
        ...action.payload,
      };
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload.id || task.status == "Completed"
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const { id, ...updatedTask } = action.payload;
      const taskToEdit = state.tasks.find((task) => task.id === id);
      if (taskToEdit) {
        Object.assign(taskToEdit, updatedTask);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, removeTask, editTask } = TaskSlice.actions;
export default TaskSlice.reducer;
