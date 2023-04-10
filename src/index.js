const express = require('express');
const api = require('./api');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// API
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('<div style="display: flex;  justify-content: center">Task App</div>')
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});