const express = require('express')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Task App')
});

app.post('/users', async (req, res) => {
    try {
        const user = await prisma.user.create({data: req.body})
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err)
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({});
        res.status(200).send(user);
    } catch(err) {
        console.log(err);
    }
});

app.post('/tasks' , async (req , res)=>{
    try {
        const task = await prisma.task.create({data: req.body})
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send(err)
    }
})

app.listen(port, () => {
    console.log('Server is runnong on port: ' + port);
});