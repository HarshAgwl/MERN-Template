const Task = require('../models/task')

module.exports.tasks = async ({ email }) => {
    const tasks = await Task.find({ email: email })
    return tasks
}

module.exports.addTask = async ({ taskInput }) => {
    const task = new Task({
        task: taskInput.task,
        email: taskInput.email
    });
    const createdTask = await task.save();
    return { message: "Task added successfully" }
}
// return { ...createdUser._doc, _id: createdUser._id.toString() };
