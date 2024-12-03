const Task = require('../models/Task');
const { Op } = require('sequelize');

exports.findTasks = async ({ name, completed, user_id }) => {
    console.log(name, completed, user_id);
    const whereClause = { user_id }; // Chỉ lấy Task của user hiện tại
    if (name) {
        whereClause.name = { [Op.like]: `%${name}%` };
    }
    if (completed !== undefined) {
        whereClause.completed = completed;
    }
    console.log(whereClause);
    return await Task.findAll({ where: whereClause });
};

exports.addTask = async ({ name, startDate, endDate, completed, user_id }) => {
    return await Task.create({ name, startDate, endDate, completed, user_id });
};
exports.deleteTask = async (taskId, user_id) => {
    const task = await Task.findOne({ where: { id: taskId, user_id } });
    if (!task) {
        return null; // Task không tồn tại hoặc không thuộc về user hiện tại
    }
    await task.destroy();
    return task;
};

exports.toggleTaskCompletion = async (taskId, user_id) => {
    const task = await Task.findOne({ where: { id: taskId, user_id } });
    if (!task) {
        return null; // Task không tồn tại hoặc không thuộc về user hiện tại
    }
    task.completed = !task.completed;
    await task.save();
    return task;
};

