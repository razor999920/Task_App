const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {csrfMiddleware, generateCsrfToken} = require('./middleware');
const api = require('./api');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware config
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 12 // 12 hours
        }
    })
);

// Add the CSRF middleware in the node application
app.use(csrfMiddleware);
// Generate the CSRF token to pass as hidden field to the client
app.use(generateCsrfToken);

app.get('/', (req, res) => {
    res.send('<div style="display: flex;  justify-content: center">Task App</div>')
});

app.get('/getCSRF', (req, res) => {
    // Your code here
    // console.log(csrfMiddleware);
    res.send({ csrfToken: req.csrfToken() });
});

// API
app.use('/api', api);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
