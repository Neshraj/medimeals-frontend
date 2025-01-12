import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import "../styles/TrackTasks.css";

const TrackTasks = () => {
  const baseURL = "https://medimealsbackend.onrender.com";
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = io(baseURL);

  useEffect(() => {
    fetchTasks();

    socket.on("taskUpdated", fetchTasks);

    return () => {
      socket.off("taskUpdated", fetchTasks);
      socket.disconnect();
    };
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/getAllTasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const tasks = await response.json();
        setAllTasks(tasks);
      } else {
        toast.error("Failed to fetch tasks.");
      }
    } catch (error) {
      toast.error("Error fetching tasks.");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-tasks-container">
      <ToastContainer position="top-center" autoClose={2000} draggable />
      <h2>All Tasks</h2>
      <div className="assigned-tasks">
        {loading ? (
          <p>Loading tasks...</p>
        ) : allTasks.length > 0 ? (
          <ul>
            {allTasks.map((task, index) => {
              let statusColor = "";
              switch (task.status) {
                case "Pending":
                  statusColor = "rgb(255, 74, 74)";
                  break;
                case "Preparing":
                  statusColor = "rgb(192, 67, 255)";
                  break;
                case "Out For Delivery":
                  statusColor = "rgb(79, 79, 255)";
                  break;
                case "Delivered":
                  statusColor = "rgb(35, 214, 35)";
                  break;
                default:
                  statusColor = "black";
              }

              return (
                <li key={index} className="task-card">
                  <div className="task-title">{task.title}</div>
                  <p>
                    <span className="status-label">Status</span> :{" "}
                    <span style={{ color: statusColor }}>{task.status}</span>
                  </p>
                  <p>Pantry : {task.pantryId}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default TrackTasks;
