const taskService = require('../services/task.service');
const STATUS_SUCCESS = 0;
const STATUS_ERROR = -1;

// Lấy tất cả các Task
module.exports.getTasks = async (req, res) => {
    const { name, completed } = req.query;

    // Xử lý giá trị của `completed` vì query parameters luôn ở dạng string
    const completedBool = completed !== undefined ? completed === 'true' : undefined;

    try {
        // Gửi các query parameters đến service
        const tasks = await taskService.findTasks({ name, completed: completedBool });
        const status = tasks.length > 0 ? STATUS_SUCCESS : STATUS_ERROR;
        res.status(200).json({ tasks, status, message: tasks.length ? "" : "No tasks found" });
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Failed to retrieve tasks', status: STATUS_ERROR });
    }
};


// Thêm một Task mới
module.exports.addTask = async (req, res) => {
    const {  name, startDate, endDate, completed } = req.body;
    try {
        const newTask = await taskService.addTask({  name, startDate, endDate, completed });
        res.status(201).json({ message: 'Task added', task: newTask, status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error adding task:', err);
        res.status(500).json({ error: 'Failed to add task', status: STATUS_ERROR });
    }
};

// Xóa một Task theo ID
module.exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        const deletedTask = await taskService.deleteTask(taskId);
        res.status(200).json({ message: 'Task deleted', task: deletedTask, status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: err.message, status: STATUS_ERROR });
    }
};

// Chuyển đổi trạng thái hoàn thành của Task
module.exports.toggleTaskCompletion = async (req, res) => {
    const taskId = req.params.id;
    try {
        const updatedTask = await taskService.toggleTaskCompletion(taskId);
        res.status(200).json({ message: 'Task completion toggled', task: updatedTask, status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error toggling task completion:', err);
        res.status(500).json({ error: err.message, status: STATUS_ERROR });
    }
};
