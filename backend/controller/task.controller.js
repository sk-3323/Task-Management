import prisma from "../lib/prisma.js";

export const gettasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.log("Get All Tasks Failed : ", error);
    res.status(500).json({ message: "Get Tasks Failed" });
  }
};

export const getSingleTask = async (req, res) => {
  try {
    const taskid = req.params.id;
    const task = await prisma.task.findUnique({ where: { id: taskid } });
    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log("Get Single Task Failed : ", error);
    res.status(500).json({ message: "Get Task Failed" });
  }
};

export const addtask = async (req, res) => {
  try {
    await prisma.task.create({
      data: req.body,
    });
    res.status(201).json({ message: "Task Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Add Tasks Failed" });
    console.log("Add Task Failed : ", error);
  }
};

export const updatetask = async (req, res) => {
  try {
    const taskid = req.params.id;
    await prisma.task.update({
      where: {
        id: taskid,
      },
      data: req.body,
    });
    res.status(200).json({ message: "Task Updated Successfully" });
  } catch (error) {
    console.log("Updating Task Failed : ", error);
    res.status(500).json({ message: "Task Updated Failed" });
  }
};

export const deletetask = async (req, res) => {
  console.log(req.params.id);

  try {
    await prisma.task.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    console.log("Delete Task Error", error);
    res.status(500).json({ message: "Delete Task Failed" });
  }
};
