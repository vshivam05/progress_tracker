import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import config from "../config";
import TaskTable from "./TaskTable";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskList() {
  const [task, setTask] = useState({
    title: "",
    priority: 1,
    status: "Pending",
    startTime: "",
    endTime: "",
  });
  const [tasks, setTasks] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const token = localStorage.getItem("token");

  const items = []; // for getting the id of select type

  const handleDelete = async () => {
    console.log("Selected items to delete:", items);
  
    try {
      const deletePromises = items.map((item) =>
        axios.delete(`${config.endpoint}/tasks/${item}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
  
      await Promise.all(deletePromises); 
      console.log("All selected tasks deleted successfully");
  
      getTasks(); 
    } catch (err) {
      console.error("Error deleting tasks:", err);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const getTasks = async () => {
    try {
      const res = await axios.get(`${config.endpoint}/tasks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const saveTask = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (isEditMode) {
        response = await axios.patch(`${config.endpoint}/tasks/${currentTaskId}`, task, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        const modalElement = document.getElementById("taskModal");
      const modal = new window.bootstrap.Modal(modalElement);
      modal.hide();
        
        console.log("Task successfully updated:", response.data);
      } else {
        response = await axios.post(`${config.endpoint}/tasks/`, task, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Task successfully added:", response.data);
      }

      const modalElement = document.getElementById("taskModal");
      const modal = new window.bootstrap.Modal(modalElement);
      modal.hide();

      setTask({
        title: "",
        priority: 1,
        status: "Pending",
        startTime: "",
        endTime: "",
      });

      getTasks(); // Refresh tasks
    } catch (error) {
      console.error("Error saving/updating task:", error);
    }
  };

  const openEditModal = (task) => {
    setIsEditMode(true);
    setCurrentTaskId(task._id);
    setTask({
      title: task.title,
      priority: task.priority,
      status: task.status,
      startTime: task.startTime,
      endTime: task.endTime,
    });

    const modalElement = document.getElementById("taskModal");
    const modal = new window.bootstrap.Modal(modalElement);
    modal.show();
  };

  return (
    <>
      <Header />
      <h1>Task list</h1>
      <br />
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#taskModal"
        onClick={() => {
          setIsEditMode(false);
          setTask({
            title: "",
            priority: 1,
            status: "Pending",
            startTime: "",
            endTime: "",
          });
        }}
      >
        + Add task
      </button>
      <button className="btn btn-danger ms-2" onClick = {handleDelete}>Delete selected</button>

      {/* Modal */}
      <div
        className="modal fade"
        id="taskModal"
        tabIndex="-1"
        aria-labelledby="taskModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={saveTask}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="taskModalLabel">
                  {isEditMode ? "Edit Task" : "Add new task"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Book travel tickets"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <input
                    type="number"
                    className="form-control"
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    placeholder="4"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="statusToggle"
                      checked={task.status === "Finished"}
                      onChange={(e) =>
                        setTask({
                          ...task,
                          status: e.target.checked ? "Finished" : "Pending",
                        })
                      }
                    />
                    <label className="form-check-label" htmlFor="statusToggle">
                      {task.status}
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Start Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="startTime"
                      value={task.startTime}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="endTime"
                      value={task.endTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditMode ? "Save changes" : "Add task"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <br />
      <br />

      <div>
        <TaskTable tasks={tasks} onEditTask={openEditModal} items = {items}/>
      </div>
    </>
  );
}

export default TaskList;
