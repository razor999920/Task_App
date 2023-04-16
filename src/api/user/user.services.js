const {db} = require('../../utils/db');
const bcrypt = require('bcryptjs');

function getAllUsers() {
    return db.user.findMany({});
}

function getUserById(userId) {
    return db.user.findUnique({
        where: {
            userId: parseInt(userId)
        }
    });
}

function getUserByEmail(email) {
    return db.user.findUnique({
        where: {
            email
        }
    });
}

function createUser(user) {
    // Hash password
    user.password = bcrypt.hashSync(user.password, 12);

    return db.user.create({
        data: user
    });
}

function updateUser(user) {
    const {email, name, age} = user;

    return db.user.update({
        where: {
            userId: parseInt(user.userId)
        }, data: {
            email,
            name,
            age
        }
    });
}

function deleteUser(userId) {
    return db.user.delete ({
        where: {
            userId: parseInt(userId)
        },
    });
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}