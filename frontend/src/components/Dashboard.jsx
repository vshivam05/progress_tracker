import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import Header from "./Header";
import SummaryCard from "./SummaryCard";
import PendingTaskTable from "./PendingTaskTable";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(""); 

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication token is missing. Please log in again.");
      return;
    }

    try {
      const res = await axios.get(`${config.endpoint}/tasks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error while fetching the data: ", err);
      setError("Failed to fetch data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "Finished").length;
  const pendingTasks = totalTasks - completedTasks;
  const pendingTime = tasks
    .filter((task) => task.status === "Pending")
    .reduce((acc, task) => acc + calculateHours(task.startTime, task.endTime), 0);

  const averageTimePerTask = totalTasks
    ? tasks.reduce((acc, task) => acc + calculateHours(task.startTime, task.endTime), 0) / totalTasks
    : 0;

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1>Dashboard</h1>

        <div style={styles.summarySection}>
          <SummaryCard value={totalTasks} title="Total tasks" />
          <SummaryCard value={`${((completedTasks / totalTasks) * 100).toFixed(0)}%`} title="Tasks completed" />
          <SummaryCard value={`${((pendingTasks / totalTasks) * 100).toFixed(0)}%`} title="Tasks pending" />
          <SummaryCard value={`${averageTimePerTask.toFixed(1)} hrs`} title="Average time per task" />
        </div>

        <h2>Pending task summary</h2>
        <div style={styles.summarySection}>
          <SummaryCard value={pendingTasks} title="Pending tasks" />
          <SummaryCard value={`${pendingTime} hrs`} title="Total pending time" />
        </div>

        <PendingTaskTable tasks={tasks} />
      </div>
    </>
  );
}

const styles = {
  container: {
    width: "70%",
    margin: "0 auto", 
    padding: "20px",
  },
  summarySection: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
};

function calculateHours(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return (end - start) / (1000 * 60 * 60);
}

export default Dashboard;
