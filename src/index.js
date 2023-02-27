const express = require('express')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Task App')
});

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({});
        res.status(200).send(users);
    } catch(err) {
        res.status(500).send();
    }
});

app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                userId: parseInt(userId)
            }
        });
        
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch(err) {        
        res.status(500).send();
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = await prisma.user.create({data: req.body})
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err)
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({});
        res.status(200).send(tasks);
    } catch(err) {
        res.status(500).send();
    }
});

app.get('/task/:id', async (req, res) => {
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

app.post('/tasks' , async (req , res)=>{
    try {
        const task = await prisma.task.create({data: req.body})
        res.status(201).send(task);
    } catch (err) {
        console.log("🚀 ~ file: index.js:86 ~ app.post ~ err:", err)
        
        res.status(400).send(err)
    }
})

app.listen(port, () => {
    console.log('Server is runnong on port: ' + port);
});