import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";

import "react-toastify/dist/ReactToastify.css";
import "../styles/TrackTasks.css";

const Delivery = () => {
  const baseURL = "https://medimealsbackend.onrender.com";
  const [allTasks, setAllTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  const { email } = state || {};
  const socket = io(baseURL);

  useEffect(() => {
    fetchTasks();
    socket.on("taskUpdated", (updatedTask) => {
      setAllTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${baseURL}/getDeliveryTasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const tasks = await response.json();
        setAllTasks(tasks);
        socket.emit("updateTask", fetchTasks);
      } else {
        toast.error("Failed to fetch tasks.");
      }
    } catch (error) {
      toast.error("Error fetching tasks.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await fetch(`${baseURL}/updateTaskStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, newStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "Task status updated successfully") {
          toast.success("Task status updated successfully");
          setAllTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.taskId === taskId ? { ...task, status: newStatus } : task
            )
          );
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Failed to update task status.");
      }
    } catch (error) {
      toast.error("Error updating task status.");
    }
  };

  return (
    <div className="track-tasks-container">
      <ToastContainer position="top-center" autoClose={2000} draggable />
      <h2>All Tasks</h2>
      <div className="assigned-tasks">
        {isLoading ? (
          <p className="taststatus">Loading tasks...</p>
        ) : allTasks.length > 0 ? (
          <ul>
            {allTasks.map((task) => (
              <li key={task._id} className="task-card">
                <div className="task-title">{task.title}</div>
                <p>
                  <span className="status-label">Status</span> :{" "}
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.taskId, e.target.value)
                    }
                    style={{
                      border: "0px",
                      padding: "5px",
                      borderRadius: "10px",
                      boxShadow: "1px 2px 1px rgb(131, 131, 131)",
                      color:
                        task.status === "Pending"
                          ? "rgb(255, 74, 74)"
                          : task.status === "Preparing"
                          ? "rgb(192, 67, 255)"
                          : task.status === "Out For Delivery"
                          ? "rgb(79, 79, 255)"
                          : "rgb(35, 214, 35)",
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </p>
                <p>Deliver To : {task.deliverTo}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="taststatus">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default Delivery;
