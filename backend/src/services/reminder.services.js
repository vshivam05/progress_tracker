const Task = require("../models/task.models");
const schedule = require("node-schedule");

const checkOverdueTasks = async () => {
    const currentDate = new Date();
    const overdueTasks = await Task.find({
        endTime: { $lt: currentDate },
        status: "Pending"
    });

    
    overdueTasks.forEach(task => {
        schedule.scheduleJob(new Date(task.endTime), () => {
            console.log(`Reminder: Task "${task.title}" is overdue!`);
        });
    });
};

module.exports = {
    checkOverdueTasks,
};
