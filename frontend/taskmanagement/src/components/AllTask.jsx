import React, { useState } from "react";
import { Link, NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
const AllTask = () => {
  const taskData = useLoaderData();
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const handleDeleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
        withCredentials: true,
      });
      console.log(res);

      setResponse(res.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (id) => {};
  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-3xl text-zinc-800 m-5 font-bold">All Task</h1>
      <hr />
      <div className="mt-5 p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {taskData.map((task) => (
            <div className="flex items-center flex-col gap-5 justify-center p-5 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-zinc-900 font-bold dark:text-gray-500">
                {task.title}
              </p>
              <p className=" text-gray-400 dark:text-gray-500">
                {task.description}
              </p>
              {/* <div className="buttons flex gap-3 justify-between"> */}
              <div className="toggle">
                <input
                  type="checkbox"
                  checked={task.status}
                  onChange={handleUpdateStatus}
                />
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
            </div>
            // </div>
          ))}

          {error && <p className="text-red-500">{error}</p>}
          {response && <p className="text-green-500">{response}</p>}
        </div>
      </div>
    </div>
  );
};

export default AllTask;
