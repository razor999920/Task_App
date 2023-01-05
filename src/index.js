const express = require('express')

const app = express();
const port = env("PORT") || 3000;

app.listen(port, () => {
    console.log('Server is runnong on port: ' + port);
})