const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Lấy tất cả các Task
router.get('/', taskController.getTasks);

// Thêm một Task mới
router.post('/', taskController.addTask);

// Xóa một Task theo ID
router.delete('/:id', taskController.deleteTask);

// Chuyển đổi trạng thái hoàn thành của Task
router.put('/toggle/:id', taskController.toggleTaskCompletion);

module.exports = router;
