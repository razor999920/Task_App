const express = require('express')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Task App')
})

app.post('/users', async (req, res) => {
    try {
        const user = await prisma.user.create({data: req.body})
        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.post('/tasks' , (req , res)=>{
    try {
        const task = prisma.task.create({data: req.body})
        res.send(task);
    } catch (err) {
        res.status(400).send(err)
    }
})

app.listen(port, () => {
    console.log('Server is runnong on port: ' + port);
})