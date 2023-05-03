const express = require('express');
const router = new express.Router();
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('./task.services');
const {serializedTasks, serializedTask} = require('../../utils/taskUtil');
const {isAuthenticated} = require('../../middleware');

router.get('/all', async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).send(serializedTasks(tasks));
    } catch(err) {
        console.log(err)
        res.status(500).send(err);
    }
});

router.get('/:taskId', async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const task = await getTaskById(taskId);

        if (!task) {
            return res.status(404).send();
        }

        res.send(serializedTask(task));
    } catch(err) {
        res.status(500).send();
    }
});

module.exports = router;