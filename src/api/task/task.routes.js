const express = require('express');
const router = new express.Router();
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('./task.services');
const {serializedTasks, serializedTask} = require('../../utils/taskUtil');
const {isAuthenticated, csrfMiddleware} = require('../../middleware');

router.get('/all', async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).send(serializedTasks(tasks));
    } catch(err) {
        console.log(err)
        res.status(500).send(err);
    }
});

router.get('/:taskId', isAuthenticated, async (req, res) => {
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

router.post('/create', isAuthenticated, async (req , res)=>{
    try {
        const task = await createTask(req.body, req.payload.userId);
        res.status(201).send(task);
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
});

router.put('/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const {description, completed} = req.body;
        const task = await updateTask(taskId, description, completed);

        if (!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await deleteTask(taskId);

        res.status(200).send(task);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

router.delete('/tasks/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const task = await deleteTask(taskId);

        res.status(200).send(task);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

module.exports = router;