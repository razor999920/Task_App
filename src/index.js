const express = require('express')
const {PrismaClient, Prisma} = require('@prisma/client')
const prisma = new PrismaClient();
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.get('/', (req, res) => {
    res.send('Task App')
});

app.listen(port, () => {
    console.log('Server is runnong on port: ' + port);
});