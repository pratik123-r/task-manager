

const taskService = require("../services/task.service");

const getAllTasks = async (req, res) => {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
};

const createTask = async (req, res) => {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
};

const updateTask = async (req, res) => {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.status(200).json(task);
};

const deleteTask = async (req, res) => {
    const task = await taskService.deleteTask(req.params.id);
    res.status(204).send();
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};