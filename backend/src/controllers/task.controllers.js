const TaskService = require("../services/task.services");
const AIService = require("../services/ai.services");

const getTask = async(req, res) => {
    try {
        const data = await TaskService.findTask();
        res.status(200).json(data);
    } catch(err) {
        res.status(500).json({err: err.message});
    }
}

const createTask = async(req, res) => {
    try {
        const { title, priority, status, startTime, endTime } = req.body;
        const newtask = await TaskService.createsTask({
            title, 
            priority,
            status,
            startTime,
            endTime
        });
        res.status(200).json(newtask);
    } catch(err) {
        res.status(500).json({err: err.message});
    }
}

const prioritizeTasks = async(req, res) => {
    try {
        const { tasks } = req.body;
        const prioritizedTasks = await AIService.prioritizeTasks(tasks);
        res.status(200).json({ prioritizedTasks });
    } catch(err) {
        res.status(500).json({ err: err.message });
    }
}

const fetchMotivationalTip = async(req, res) => {
    try {
        const tip = AIService.fetchMotivationalTip();
        res.status(200).json({ tip });
    } catch(err) {
        res.status(500).json({ err: err.message });
    }
}

const updateTask = async(req, res) => {
    try {
        const id = req.params.id;
        const result = await TaskService.updates(id, req.body);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({ err: err.message });
    }
}

const deleteTask = async(req, res) => {
    try {
        const id = req.params.id;
        const result = await TaskService.deletes(id);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({ err: err.message });
    }
}

module.exports = {
    getTask,
    createTask,
    prioritizeTasks,
    fetchMotivationalTip,
    updateTask,
    deleteTask,
};
