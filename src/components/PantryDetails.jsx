import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/PantryDetails.css";
import preData from "../data/mealdata"; // Importing the meal data

const PantryDetails = () => {
  const { state } = useLocation();
  const { staff } = state || {};
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedMealTime, setSelectedMealTime] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [mealInstruction, setMealInstruction] = useState(""); // To store meal instructions

  if (!staff) {
    return <div>No staff details available.</div>;
  }

  const handleAssignTask = () => {
    if (!selectedDay || !selectedMealType || !selectedMealTime || !selectedMeal) {
      alert("Please select a day, meal type, meal time, and meal.");
      return;
    }
    
    // Add the task with meal instruction
    const taskDetails = `${selectedDay} - ${selectedMealType} - ${selectedMealTime} - ${selectedMeal}`;
    const taskWithInstruction = `${taskDetails} - Instruction: ${mealInstruction}`;

    setAssignedTasks((prev) => [...prev, taskWithInstruction]);

    setSelectedDay("");
    setSelectedMealType("");
    setSelectedMealTime("");
    setSelectedMeal("");
    setMealInstruction(""); // Clear the meal instruction after assigning the task
    alert(`Task assigned: ${taskWithInstruction} to ${staff.name}`);
  };

  const handleMealChange = (e) => {
    const meal = e.target.value;
    setSelectedMeal(meal);

    // Find the selected meal's instruction
    const instruction = preData[selectedDay]?.[selectedMealType]?.[selectedMealTime]?.instructions;
    setMealInstruction(instruction || "No instruction available");
  };

  return (
    <div className="pantry-details-container">
      <h2>Staff Details</h2>
      <div className="staff-info">
        <p><strong>Name:</strong> {staff.name}</p>
        <p><strong>Contact:</strong> {staff.contact}</p>
        <p><strong>Location:</strong> {staff.location}</p>
      </div>

      <div className="meal-selection-container">
        <h3>Select Meal</h3>

        <div className="meal-select">
          <label>Day</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
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
              <select
                value={selectedMealType}
                onChange={(e) => setSelectedMealType(e.target.value)}
              >
                <option value="">Select Meal Type</option>
                <option value="veg">Vegetarian</option>
                <option value="nonVeg">Non-Vegetarian</option>
              </select>
            </div>

            {selectedMealType && (
              <>
                <div className="meal-select">
                  <label>Meal Time</label>
                  <select
                    value={selectedMealTime}
                    onChange={(e) => setSelectedMealTime(e.target.value)}
                  >
                    <option value="">Select Meal Time</option>
                    <option value="morning">Breakfast</option>
                    <option value="evening">Lunch</option>
                    <option value="night">Dinner</option>
                  </select>
                </div>

                {selectedMealTime && (
                  <div className="meal-select">
                    <label>Meal</label>
                    <select
                      value={selectedMeal}
                      onChange={handleMealChange}
                    >
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
        {assignedTasks.length > 0 ? (
          <ul>
            {assignedTasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        ) : (
          <p>No tasks assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default PantryDetails;
