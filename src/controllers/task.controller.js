import Task from "../models/Task";

export const createTask = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      done: req.body.done ? req.body.done : false,
    });
    const taskSaved = await newTask.save();
    res.json(taskSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong creating a task",
    });
  }
};

export const findAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message || "Ocurrio un error" });
  }
};

export const findAllDoneTasks = async (req, res) => {
  const tasks = await Task.find({ done: true });
  res.json(tasks);
};

export const findOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);

    if (!task)
      return res
        .status(404)
        .json({ message: `Task with id ${id} does not exits` });

    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({
        message: error.message || `Error retrieving Task with id ${id}`,
      });
  }
};

export const updateTask = async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id);
  res.json({ message: "Se eliminio la tarea" });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Se actualizo la tarea" });
  } catch (error) {
    res.status(500).json({ message: `Cannot delete task id: ${id}` });
  }
};
