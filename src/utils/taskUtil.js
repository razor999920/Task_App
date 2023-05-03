function serializedTasks (tasks) {
    return tasks.map((task) => {
        return {
            taskId: task.taskId.toString(),
            description: task.description,
            completed: task.completed
        };
    })
}

function serializedTask (task) {
    return {
        taskId: task.taskId.toString(),
        description: task.description,
        completed: task.completed
    };
}

module.exports = {
    serializedTasks,
    serializedTask
}