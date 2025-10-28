const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const { taskRules, validate } = require('../../middleware/validation');
const taskController = require('../../controllers/taskController');


router.post('/', [auth, taskRules, validate], taskController.createTask);

router.get('/', auth, taskController.getUserTasks);


router.get('/all', [auth, admin], taskController.getAllTasks);


router.get('/:id', auth, taskController.getTaskById);


router.put('/:id', [auth, taskRules, validate], taskController.updateTask);


router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;