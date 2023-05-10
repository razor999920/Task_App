const express = require('express');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const api = require('./api');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Middleware config
const csrfMiddleware = csurf({ cookie: true });

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

// Generate the CSRF token to pass as hidden field to the client
function generateCsrfToken(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
}

app.get('/testcsrf', csrfMiddleware, generateCsrfToken, (req, res) => {
    // Your code here
    // console.log(csrfMiddleware);
    res.send("Done")
});


app.use(csrfMiddleware);

// Set CSRF token in res.locals to use it in views
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.get('/', (req, res) => {
    res.send('<div style="display: flex;  justify-content: center">Task App</div>')
});

// API
app.use('/api', api);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});