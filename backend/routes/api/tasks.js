const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const { taskRules, validate } = require('../../middleware/validation');
const taskController = require('../../controllers/taskController');

// @route   POST api/v1/tasks
// @desc    Create a new task
// @access  Private (User)
router.post('/', [auth, taskRules, validate], taskController.createTask);

// @route   GET api/v1/tasks
// @desc    Get all tasks for the logged-in user
// @access  Private (User)
router.get('/', auth, taskController.getUserTasks);

// @route   GET api/v1/tasks/all
// @desc    Get all tasks from all users
// @access  Private (Admin)
router.get('/all', [auth, admin], taskController.getAllTasks);

// @route   GET api/v1/tasks/:id
// @desc    Get a single task by ID
// @access  Private (User)
router.get('/:id', auth, taskController.getTaskById);

// @route   PUT api/v1/tasks/:id
// @desc    Update a task
// @access  Private (User - owner)
router.put('/:id', [auth, taskRules, validate], taskController.updateTask);

// @route   DELETE api/v1/tasks/:id
// @desc    Delete a task
// @access  Private (User - owner)
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;