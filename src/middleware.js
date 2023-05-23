const csrfMiddleware = require('csurf')({ cookie: true });
const {deleteTaskForUser} = require('./api/task/task.services')
const jwt = require('jsonwebtoken');

// Generate the CSRF token to pass as hidden field to the client
function generateCsrfToken(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
}

function validateCsrfToken(req, res, next) {
    const token = req.headers['X-CSRF-Token'];
    if (!token || token !== req.session.csrfToken) {
        return res.status(403).send('Invalid CSRF Token');
    }

    next();
}

function deleteUserTask (res, req, next) {
    const user = req.payload.user;

    deleteTaskForUser(user.userId);
}

function isAuthenticated(req, res, next) {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            res.status(401).json({msg: '🚫 Un-Authorized 🚫'});
        }

        req.payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
        res.status(401);

        if (err.name === 'TokenExpiredError') {
            console.error(err.name);
        }

        console.error('🚫 Un-Authorized 🚫');
    }

    return next();
}

module.exports = {
    csrfMiddleware,
    generateCsrfToken,
    validateCsrfToken,
    isAuthenticated,
}