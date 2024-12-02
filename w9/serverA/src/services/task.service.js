const Task = require('../models/Task');
const { Op } = require('sequelize');

exports.findTasks = async (filters) => {
    const { name, completed } = filters;

    // Tạo điều kiện tìm kiếm
    const whereClause = {};
    if (name) {
        whereClause.name = { [Op.like]: `%${name}%` }; // Tìm kiếm tên chứa từ khóa
    }
    if (completed !== undefined) {
        whereClause.completed = completed;
    }

    // Truy vấn với điều kiện (hoặc không có điều kiện nếu whereClause rỗng)
    return await Task.findAll({ where: whereClause });
};

exports.addTask = async (taskData) => {
    return await Task.create(taskData);
};

exports.deleteTask = async (taskId) => {
    const task = await Task.findByPk(taskId);
    if (!task) {
        throw new Error('Task not found');
    }
    await task.destroy();
    return task;
};

exports.toggleTaskCompletion = async (taskId) => {
    const task = await Task.findByPk(taskId);
    if (!task) {
        throw new Error('Task not found');
    }
    task.completed = !task.completed;
    await task.save();
    return task;
};

