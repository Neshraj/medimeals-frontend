import React, { useState } from "react";
import preData from "../data/mealdata";

import "../styles/FoodChart.css";

function FoodChart() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [mealType, setMealType] = useState("veg");
  const [mealPlans, setMealPlans] = useState(preData);

  const handleInputChange = (e, mealTime) => {
    const { name, value } = e.target;
    setMealPlans((prevState) => ({
      ...prevState,
      [selectedDay]: {
        ...prevState[selectedDay],
        [mealType]: {
          ...prevState[selectedDay][mealType],
          [mealTime]: {
            ...prevState[selectedDay][mealType][mealTime],
            [name]: value,
          },
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Food Chart Submitted:", mealPlans[selectedDay][mealType]);
  };

  return (
    <div className="food-chart-container">
      <h1>Food Chart</h1>

      <div className="days-container">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
          <button
            key={day}
            className={`day-btn ${selectedDay === day ? "selected" : ""}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="meal-type-container">
        <button
          className={`meal-type-btn ${mealType === "veg" ? "selected" : ""}`}
          onClick={() => setMealType("veg")}
        >
          Veg
        </button>
        <button
          className={`meal-type-btn ${mealType === "nonVeg" ? "selected" : ""}`}
          onClick={() => setMealType("nonVeg")}
        >
          Non-Veg
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {["morning", "evening", "night"].map((mealTime) => (
          <div className="meal-plan" key={mealTime}>
            <h3>{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)} Meal</h3>
            <label>
              Meal:
              <input
                type="text"
                name="meal"
                value={mealPlans[selectedDay][mealType][mealTime].meal}
                onChange={(e) => handleInputChange(e, mealTime)}
              />
            </label>
            <label>
              Instructions:
              <input
                type="text"
                name="instructions"
                value={mealPlans[selectedDay][mealType][mealTime].instructions}
                onChange={(e) => handleInputChange(e, mealTime)}
              />
            </label>
          </div>
        ))}

        <button type="submit" className="submit-btn">
          Save Food Chart
        </button>
      </form>
    </div>
  );
}

export default FoodChart;
