const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTask = new Task({
      title,
      description,
      status,
      user: req.user.id, 
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get User's Tasks
exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('user', ['name', 'email']).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const { title, description, status } = req.body;
        const updatedFields = { title, description, status };

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true } 
        );

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await task.remove();
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};