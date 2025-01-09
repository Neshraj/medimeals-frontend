import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/PantryDetails.css";
import preData from "../data/mealdata";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const PantryDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { staff } = state || {};
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedMealTime, setSelectedMealTime] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [mealInstruction, setMealInstruction] = useState("");
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    if (staff?.email) {
      fetchTasksForStaff(staff.email);
    }
  }, [staff]);

  const fetchTasksForStaff = async (email) => {
    try {
      const response = await fetch("http://localhost:5000/getTasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const tasks = await response.json();
        setAssignedTasks(tasks.map((task) => task.title));
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

  const handleAssignTask = async () => {
    if (!selectedDay || !selectedMealType || !selectedMealTime || !selectedMeal) {
      toast.info("Please select a day, meal type, meal time, and meal.");
      return;
    }

    const taskDetails = `${selectedDay} - ${selectedMealTime} - ${selectedMealType} - ${selectedMeal} - ${mealInstruction}`;
    const taskId = generateUniqueId();
    const task = {
      pantryId: staff.email,
      title: taskDetails,
      taskId,
      status: "Pending",
    };

    try {
      const response = await fetch("http://localhost:5000/assignTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
        setAssignedTasks((prev) => [...prev, taskDetails]);
        setAllTasks((prev) => [...prev, task]);
        setSelectedDay("");
        setSelectedMealType("");
        setSelectedMealTime("");
        setSelectedMeal("");
        setMealInstruction("");
      } else {
        toast.error("Failed to assign task.");
      }
    } catch (error) {
      toast.error("Error assigning task.");
    }
  };

  const handleMealChange = (e) => {
    const meal = e.target.value;
    setSelectedMeal(meal);

    const instruction = preData[selectedDay]?.[selectedMealType]?.[selectedMealTime]?.instructions;
    setMealInstruction(instruction || "No instruction available");
  };

  const removeStaff = async () => {
    try {
      const response = await fetch("http://localhost:5000/removepantrystaff", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staff),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.message === "Staff removed successfully") {
          toast.success(result.message);
          navigate("/manager/inner-pantry");
        } else if (result.message === "Staff not found") {
          toast.info(result.message);
          navigate("/manager/inner-pantry");
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error("Error updating patient details:");
    }
  };

  return (
    <div className="pantry-details-container">
      <ToastContainer position="top-center" autoClose={2000} draggable />
      <h2>Staff Details</h2>
      <div className="staff-info">
        <p><strong>Name:</strong> {staff.name}</p>
        <p><strong>Contact:</strong> {staff.contact}</p>
        <p><strong>Email:</strong> {staff.email}</p>
        <p><strong>Location:</strong> {staff.location}</p>
        <button className="remove-btn" onClick={removeStaff}>Remove staff</button>
      </div>

      <div className="meal-selection-container">
        <h3>Select Meal</h3>
        <div className="meal-select">
          <label>Day</label>
          <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            <option value="">Select a Day</option>
            {Object.keys(preData).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {selectedDay && (
          <>
            <div className="meal-select">
              <label>Meal Type</label>
              <select value={selectedMealType} onChange={(e) => setSelectedMealType(e.target.value)}>
                <option value="">Select Meal Type</option>
                <option value="veg">Vegetarian</option>
                <option value="nonVeg">Non-Vegetarian</option>
              </select>
            </div>

            {selectedMealType && (
              <>
                <div className="meal-select">
                  <label>Meal Time</label>
                  <select value={selectedMealTime} onChange={(e) => setSelectedMealTime(e.target.value)}>
                    <option value="">Select Meal Time</option>
                    <option value="morning">Breakfast</option>
                    <option value="evening">Lunch</option>
                    <option value="night">Dinner</option>
                  </select>
                </div>

                {selectedMealTime && (
                  <div className="meal-select">
                    <label>Meal</label>
                    <select value={selectedMeal} onChange={handleMealChange}>
                      <option value="">Select Meal</option>
                      {Object.keys(preData[selectedDay][selectedMealType]).map((mealTime) => (
                        <option key={mealTime} value={preData[selectedDay][selectedMealType][mealTime].meal}>
                          {preData[selectedDay][selectedMealType][mealTime].meal}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {mealInstruction && (
          <div className="meal-instruction">
            <h4>Meal Instruction</h4>
            <p>{mealInstruction}</p>
          </div>
        )}

        <button onClick={handleAssignTask} className="assign-btn">
          Assign Task
        </button>
      </div>

      <div className="assigned-tasks">
  <h3>Assigned Tasks</h3>
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
            statusColor = "black"; // Default color if status is not recognized
        }

        return (
          <li key={index} className="assignedtaskscard">
            {task.title}
            <p><span style={{textDecoration:'underline'}}>Status</span> : <span style={{ color: statusColor }}>{task.status}</span></p>
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

export default PantryDetails;
