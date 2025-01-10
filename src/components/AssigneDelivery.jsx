import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/PantryDetails.css";
import preData from "../data/mealdata";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";

const AssigneDelivery = () => {
  const baseURL = "http://localhost:5000";
  const navigate = useNavigate();
  const { state } = useLocation();
  const { staff } = state || {};
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedMealTime, setSelectedMealTime] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [mealInstruction, setMealInstruction] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [allPatientDetails, setAllPatientDetails] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState({}); // Store selected patients per task
  const email = localStorage.getItem("email");
  const socket = io(baseURL);

  useEffect(() => {
    if (staff?.email) {
      fetchPatientDetails();
      fetchTasksForStaff(email);
    }

    socket.on("taskUpdated", () => {
      fetchTasksForStaff(email);
    });

    return () => {
      socket.disconnect();
    };
  }, [staff]);

  const fetchTasksForStaff = async (email) => {
    try {
      const response = await fetch(`${baseURL}/getTasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const tasks = await response.json();
        setAllTasks(tasks);
      } else {
        toast.error("Failed to fetch tasks.");
      }
    } catch (error) {
      toast.error("Error fetching tasks.");
    }
  };

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleAssignTask = async (taskId,index) => {    
    const selectedPatient = selectedPatients[index];
    if (!selectedPatient) {
      toast.info("Please select a patient for this task.");
      return;
    }

    const task = {
      pantryId: email,
      deliveryId: staff.email,
      deliverTo: selectedPatient,
      taskId :taskId,
    };

    try {
      const response = await fetch(`${baseURL}/updateTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.message === "Delivery Added") {
          toast.success("Delivery Added");
          fetchTasksForStaff(email);
        } else {
          toast.error("Failed to update task details");
        }
      } else {
        toast.error("Failed to update task details");
      }
    } catch (error) {
      toast.error("Error assigning task.");
    }
  };

  const handlePatientChange = (taskId, value) => {
    setSelectedPatients((prev) => ({
      ...prev,
      [taskId]: value,
    }));
  };

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`${baseURL}/getpatientsdetails`);
      const data = await response.json();
      setAllPatientDetails(data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  return (
    <div className="pantry-details-container">
      <ToastContainer position="top-center" autoClose={2000} draggable />
      <h2>Staff Details</h2>
      <div className="staff-info">
        <p>
          <strong>Name:</strong> {staff.name}
        </p>
        <p>
          <strong>Contact:</strong> {staff.contact}
        </p>
        <p>
          <strong>Email:</strong> {staff.email}
        </p>
        <p>
          <strong>Location:</strong> {staff.location}
        </p>
      </div>
      <div className="assigned-tasks">
        <h3>Task To Assign</h3>
        {allTasks.length > 0 ? (
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
                <li key={index} className="assignedtaskscard">
                  {task.title}
                  <p>
                    <span style={{ textDecoration: "underline" }}>Status</span> : <span style={{ color: statusColor }}>{task.status}</span>
                  </p>
                  <label htmlFor={`patient-select-${index}`}>Select Patient</label>
                  <select
                    id={`patient-select-${index}`}
                    onChange={(e) => handlePatientChange(index, e.target.value)}
                    value={selectedPatients[index] || ""}
                    style={{
                      border: "0px",
                      backgroundColor: "rgb(255, 255, 255)",
                      padding: "5px",
                      marginBottom: "5px",
                      borderRadius: "5px",
                      boxShadow: "1px 2px 1px rgb(116, 116, 116)",
                    }}
                  >
                    <option value="">Select Patient</option>
                    {allPatientDetails.map((patient, idx) => (
                      <option key={idx} value={patient.name}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                  <br />
                  <button
                    onClick={() => handleAssignTask(task.taskId,index)}
                    className="assign-btn"
                  >
                    Assign Delivery
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No tasks assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default AssigneDelivery;
