const {db} = require('../../utils/db');
const bcrypt = require('bcryptjs');

function getAllTasks() {
    return db.task.findMany({});
}


function getTaskById(taskId) {
    return db.task.findUnique({
        where: {
            taskId: parseInt(taskId)
        }
    });
}

function createTask(task) {
    return db.task.create({data: task});
}

function updateTask(taskId, description, completed) {
    return db.task.update({
        where: {
            taskId: parseInt(taskId)
        },
        data: {
            description,
            completed
        }
    });
}

function deleteTask(taskId) {
    return db.task.delete ({
        where: {
            taskId: parseInt(taskId)
        },
    });
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};