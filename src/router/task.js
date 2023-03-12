const express = require('express')
const {PrismaClient, Prisma} = require('@prisma/client')
const prisma = new PrismaClient();
const router = new express.Router()

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({});
        res.status(200).send(tasks);
    } catch(err) {
        res.status(500).send();
    }
});

router.get('/task/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await prisma.task.findUnique({
            where: {
                taskId: parseInt(taskId)
            }
        });
        
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch(err) {        
        res.status(500).send();
    }
});

router.post('/tasks' , async (req , res)=>{
    try {
        const task = await prisma.task.create({data: req.body})
        res.status(201).send(task);
    } catch (err) {        
        res.status(400).send(err)
    }
});

router.put('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const {description, completed} = req.body;

        const task = await prisma.task.update({
            where: {
                taskId: parseInt(taskId)
            },
            data: {
                description,
                completed
            }
        });
                
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
        const task = await prisma.task.delete ({
            where: {
                taskId: parseInt(taskId)
            },
        });

        res.status(200).send(task);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

module.exports = router;