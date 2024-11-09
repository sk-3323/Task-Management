import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
const UpdateTask = () => {
  const task = useLoaderData();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const status = formData.get("status");
    const updatedStatus = status === "on" ? true : false;
    const updatedTask = {
      title: formData.get("title"),
      description: formData.get("description"),
      status: updatedStatus,
    };
    console.log(updatedTask);

    try {
      const res = await axios.put(
        `http://localhost:3000/api/tasks/${task.id}`,
        updatedTask,
        {
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" sm:ml-64">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Update Task
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="title"
              >
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={task.title}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                defaultValue={task.description}
                name="description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description"
              ></textarea>
            </div>

            <div className=" flex items-center mb-4 gap-3">
              <label
                className=" text-sm font-medium text-gray-700 "
                htmlFor="description"
              >
                Task Status
              </label>
              <input
                type="checkbox"
                defaultChecked={task.status}
                name="status"
              ></input>
              <span className="text-sm text-gray-400">
                Checked means Completed and Unchecked means pending
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
