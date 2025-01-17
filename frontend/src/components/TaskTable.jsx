import React from 'react';
import { FaEdit } from 'react-icons/fa';
import './TaskTable.css'; 

function TaskTable({ tasks, onEditTask, items }) {
    // const items = [];

  const calculateDurationInHours = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMilliseconds = end - start;
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    return durationInHours.toFixed(2);
  };

  const handleCheckbox = (e) => {
    items.push(e.target.id);
    console.log(items);
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr className="table-header">
          <th className="table-header"><input type="checkbox" /></th>
          <th className="table-header">Task ID</th>
          <th className="table-header">Title</th>
          <th className="table-header">Priority</th>
          <th className="table-header">Status</th>
          <th className="table-header">Start Time</th>
          <th className="table-header">End Time</th>
          <th className="table-header">Total time to finish (hrs)</th>
          <th className="table-header">Edit</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task._id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
            <td className="table-cell">
              <input type="checkbox" id = {task._id} onClick={handleCheckbox}/>
            </td>
            <td className="table-cell">{index + 1}</td>
            <td className="table-cell">{task.title}</td>
            <td className="table-cell">{task.priority}</td>
            <td className="table-cell">{task.status}</td>
            <td className="table-cell">{task.startTime}</td>
            <td className="table-cell">{task.endTime}</td>
            <td className="table-cell">
              {calculateDurationInHours(task.startTime, task.endTime)}
            </td>
            <td className="table-cell">{task.totalTime}</td>
            <td className="table-cell">
              <button
                className="edit-button"
                onClick={() => onEditTask(task)}
                title="Edit"
              >
                <FaEdit />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;