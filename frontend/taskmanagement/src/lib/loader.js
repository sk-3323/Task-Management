import axios from "axios";

export const getAllTasks = async () => {
  const res = await axios.get(`http://localhost:3000/api/tasks`, {
    withCredentials: true,
  });
  return res.data;
};

export const getTaskById = async (taskId) => {
  const id = taskId.params.id;
  const res = await axios.get(`http://localhost:3000/api/tasks/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
