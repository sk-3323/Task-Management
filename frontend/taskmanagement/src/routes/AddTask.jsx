import axios from "axios";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const data = {
      title,
      description,
    };
    try {
      const res = await axios.post(`http://localhost:3000/api/tasks`, data, {
        withCredentials: true,
      });
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
            Add New Task
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
                name="description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
