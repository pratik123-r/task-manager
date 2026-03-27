

const { prisma } = require("../config/prisma");

const getAllTasks = async () => {
    return await prisma.task.findMany();
};

const createTask = async (task) => {
    return await prisma.task.create({ data: task });
};

const updateTask = async (id, task) => {
    return await prisma.task.update({ where: { id: Number(id) }, data: task });
};

const deleteTask = async (id) => {
    return await prisma.task.delete({ where: { id: Number(id) } });
};

const getTaskById = async (id) => {
    return await prisma.task.findUnique({ where: { id: Number(id) } });
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById
};