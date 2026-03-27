


const taskRepository = require("../repositories/task.repository");
const ApiError = require("../utils/apiError");

const getAllTasks = async () => {
    return await taskRepository.getAllTasks();
};

const createTask = async (task) => {
    if (!task.title) {
        throw new ApiError(400, "Title is required");
    }
    if (task.status !== "pending" && task.status !== "done") {
        throw new ApiError(400, "Invalid status");
    }
    return await taskRepository.createTask(task);
};

const updateTask = async (id, task) => {

    const existingTask = await taskRepository.getTaskById(id);
    if (!existingTask) {
        throw new ApiError(404, "Task not found");
    }
    if (task.status !== "pending" && task.status !== "done") {
        throw new ApiError(400, "Invalid status");
    }
    return await taskRepository.updateTask(id, task);
};

const deleteTask = async (id) => {
    const existingTask = await taskRepository.getTaskById(id);
    if (!existingTask) {
        throw new ApiError(404, "Task not found");
    }
    return await taskRepository.deleteTask(id);
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};