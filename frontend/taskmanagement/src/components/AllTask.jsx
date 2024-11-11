import React, { useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import Cookies from "js-cookie";

const AllTask = () => {
  const taskData = useLoaderData();
  const [error, setError] = useState("");

  const handleDeleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-3xl text-zinc-800 m-5 font-bold">All Task</h1>
      <hr />
      <div className="mt-5 p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700">
        {taskData.length !== 0 ? (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {taskData.map((task) => (
              <div className="flex items-center flex-col gap-5 justify-center p-5 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-zinc-900 font-bold dark:text-gray-500">
                  {task.title}
                </p>
                <p className=" text-gray-400 dark:text-gray-500">
                  {task.description}
                </p>
                <div className="toggle">
                  <input type="checkbox" checked={task.status} />
                  {task.status ? (
                    <label className="text-gray-500 dark:text-gray-400">
                      Completed
                    </label>
                  ) : (
                    <label className="text-gray-500 dark:text-gray-400">
                      Pending
                    </label>
                  )}
                </div>
                <div className="btns flex gap-3">
                  <NavLink to={`/edit-task/${task.id}`}>
                    <img
                      src="edit.png"
                      height={50}
                      width={50}
                      alt=""
                      className="px-4 py-3 bg-yellow-400 rounded-md"
                    />
                  </NavLink>
                  <button onClick={() => handleDeleteTask(task.id)}>
                    <img
                      src="delete.png"
                      height={50}
                      width={50}
                      alt=""
                      className="px-4 py-3 bg-red-400 rounded-md"
                    />
                  </button>
                </div>
                <span className="text-gray-300">{format(task.createdAt)}</span>
              </div>
              // </div>
            ))}

            {error && <p className="text-red-500">{error}</p>}
          </div>
        ) : (
          <p className="font-bold text-red-500">Task Empty.......</p>
        )}
      </div>
    </div>
  );
};

export default AllTask;
