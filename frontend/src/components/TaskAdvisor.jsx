import React, { useState } from 'react';
import axios from 'axios';

const TaskAdvisor = () => {
    const [taskDetails, setTaskDetails] = useState('');
    const [advice, setAdvice] = useState('');

    const handleGetAdvice = async () => {
        try {
            const response = await axios.post('/api/ai/chat', {
                prompt: `Suggest priorities for the following task: ${taskDetails}`,
            });
            setAdvice(response.data.response);
        } catch (error) {
            console.error(error);
            setAdvice('Error fetching advice');
        }
    };

    return (
        <div>
            <textarea
                value={taskDetails}
                onChange={(e) => setTaskDetails(e.target.value)}
                placeholder="Describe your task here"
            />
            <button onClick={handleGetAdvice}>Get Advice</button>
            <p>{advice}</p>
        </div>
    );
};

export default TaskAdvisor;
