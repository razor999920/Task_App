const {db} = require('../../utils/db');

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

function createTask(task, userId) {
    return db.task.create(
        {
            data: {
                description: task.description,
                completed: task.completed,
                userId: BigInt(userId)
            }
        }
    );
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

function deleteTaskForUser(userId) {
    return db.task.delete ({
        where: {
            userId
        },
    });
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    deleteTaskForUser
};