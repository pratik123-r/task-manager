const taskService = require('./task.service');
const taskRepository = require('../repositories/task.repository');
const ApiError = require('../utils/apiError');

jest.mock('../repositories/task.repository');

describe('Task Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTasks', () => {
        it('should return all tasks', async () => {
            const mockTasks = [{ id: 1, title: 'Task 1', status: 'pending' }];
            taskRepository.getAllTasks.mockResolvedValue(mockTasks);

            const result = await taskService.getAllTasks();
            expect(result).toEqual(mockTasks);
            expect(taskRepository.getAllTasks).toHaveBeenCalledTimes(1);
        });
    });

    describe('createTask', () => {
        it('should throw ApiError if title is missing', async () => {
            const task = { status: 'pending' };
            await expect(taskService.createTask(task)).rejects.toThrow(ApiError);
            await expect(taskService.createTask(task)).rejects.toHaveProperty('statusCode', 400);
        });

        it('should throw ApiError if status is invalid', async () => {
            const task = { title: 'Test', status: 'invalid' };
            await expect(taskService.createTask(task)).rejects.toThrow(ApiError);
        });

        it('should create and return a task if valid', async () => {
            const task = { title: 'Test', status: 'pending' };
            const createdTask = { id: 1, ...task };
            taskRepository.createTask.mockResolvedValue(createdTask);

            const result = await taskService.createTask(task);
            expect(result).toEqual(createdTask);
            expect(taskRepository.createTask).toHaveBeenCalledWith(task);
        });
    });

    describe('updateTask', () => {
        it('should throw ApiError if task not found', async () => {
            taskRepository.getTaskById.mockResolvedValue(null);
            const task = { title: 'Updated', status: 'done' };
            await expect(taskService.updateTask(1, task)).rejects.toThrow(ApiError);
            await expect(taskService.updateTask(1, task)).rejects.toHaveProperty('statusCode', 404);
        });

        it('should throw ApiError if status is invalid', async () => {
            taskRepository.getTaskById.mockResolvedValue({ id: 1, title: 'Old' });
            const task = { title: 'Updated', status: 'invalid' };
            await expect(taskService.updateTask(1, task)).rejects.toThrow(ApiError);
        });

        it('should update and return task if valid', async () => {
            const existingTask = { id: 1, title: 'Old', status: 'pending' };
            const updateData = { title: 'New', status: 'done' };
            const updatedTask = { ...existingTask, ...updateData };

            taskRepository.getTaskById.mockResolvedValue(existingTask);
            taskRepository.updateTask.mockResolvedValue(updatedTask);

            const result = await taskService.updateTask(1, updateData);
            expect(result).toEqual(updatedTask);
            expect(taskRepository.updateTask).toHaveBeenCalledWith(1, updateData);
        });
    });

    describe('deleteTask', () => {
        it('should throw ApiError if task not found', async () => {
            taskRepository.getTaskById.mockResolvedValue(null);
            await expect(taskService.deleteTask(1)).rejects.toThrow(ApiError);
        });

        it('should delete task successfully', async () => {
            const existingTask = { id: 1, title: 'Test', status: 'pending' };
            taskRepository.getTaskById.mockResolvedValue(existingTask);
            taskRepository.deleteTask.mockResolvedValue({ message: 'Task deleted successfully' });

            const result = await taskService.deleteTask(1);
            expect(result.message).toBe('Task deleted successfully');
            expect(taskRepository.deleteTask).toHaveBeenCalledWith(1);
        });
    });
});
