const express = require('express');
const router = new express.Router();
const auth = require('./api/auth/auth.routes');
// const userRouter = require('./router/user');
// const taskRouter = require('./router/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(userRouter);
// app.use(taskRouter);
router.use('/auth', auth);

app.get('/', (req, res) => {
    res.send('<div style="display: flex;  justify-content: center">Task App</div>')
});

app.listen(port, () => {
    console.log('Server is runnong on port: ' + port);
});