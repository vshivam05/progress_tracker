const axios = require('axios');
const schedule = require('node-schedule');

const AI_MODEL_ENDPOINT = 'http://localhost:5000/chat'; // Updated to point to the GPT-4All chat endpoint

const handleChat = async (prompt) => {
    try {
        const response = await axios.post(AI_MODEL_ENDPOINT, { prompt });
        return response.data; // Assuming the AI model returns suggestions
    } catch (error) {
        console.error("Error calling AI model:", error);
        throw new Error("AI model interaction failed");
    }
};

const prioritizeTasks = (tasks) => {
    return tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
};

const fetchMotivationalTip = () => {
    const tips = ["Take regular breaks", "Set realistic goals", "Stay hydrated"];
    return tips[Math.floor(Math.random() * tips.length)];
};

module.exports = {
    handleChat, // Export the new handleChat function
    prioritizeTasks,
    fetchMotivationalTip,
};
