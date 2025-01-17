import React from "react";

function PendingTaskTable({ tasks }) {
  const pendingTasks = tasks.filter((task) => task.status === "Pending");

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <thead>
        <tr style={{ background: "#ddd" }}>
          <th>Task Title</th>
          <th>Priority</th>
          <th>Time Lapsed (hrs)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {pendingTasks.length > 0 ? (
          pendingTasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.priority}</td>
              <td>{calculateHours(task.startTime, task.endTime)}</td>
              <td>{task.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              No pending tasks available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function calculateHours(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return ((end - start) / (1000 * 60 * 60)).toFixed(1); 
}

export default PendingTaskTable;
