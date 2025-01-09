import React, { useState } from "react";
import "../styles/FoodChart.css";

function FoodChart() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [mealType, setMealType] = useState("veg");

  const preData = {Monday: {
    veg: {
      morning: { meal: "Aloo Paratha", instructions: "Serve with yogurt and pickle" },
      evening: { meal: "Chole Bhature", instructions: "Serve with onions and chutney" },
      night: { meal: "Paneer Butter Masala with Naan", instructions: "Serve with raita" },
    },
    nonVeg: {
      morning: { meal: "Egg Paratha", instructions: "Serve with yogurt and pickle" },
      evening: { meal: "Chicken Bhature", instructions: "Serve with onions and chutney" },
      night: { meal: "Butter Chicken with Naan", instructions: "Serve with raita" },
    },
  },
  Tuesday: {
    veg: {
      morning: { meal: "Poha", instructions: "Serve with lemon and sev" },
      evening: { meal: "Dosa with Sambar", instructions: "Serve with coconut chutney" },
      night: { meal: "Baingan Bharta with Chapati", instructions: "Serve with yogurt" },
    },
    nonVeg: {
      morning: { meal: "Chicken Poha", instructions: "Serve with lemon and sev" },
      evening: { meal: "Mutton Dosa with Sambar", instructions: "Serve with coconut chutney" },
      night: { meal: "Chicken Baingan Bharta with Chapati", instructions: "Serve with yogurt" },
    },
  },
  Wednesday: {
    veg: {
      morning: { meal: "Idli with Sambar", instructions: "Serve with coconut chutney" },
      evening: { meal: "Pav Bhaji", instructions: "Serve with buttered pav and onions" },
      night: { meal: "Matar Paneer with Rice", instructions: "Serve with pickle" },
    },
    nonVeg: {
      morning: { meal: "Egg Idli with Sambar", instructions: "Serve with coconut chutney" },
      evening: { meal: "Chicken Pav Bhaji", instructions: "Serve with buttered pav and onions" },
      night: { meal: "Mutton Matar with Rice", instructions: "Serve with pickle" },
    },
  },
  Thursday: {
    veg: {
      morning: { meal: "Upma", instructions: "Serve with coconut chutney" },
      evening: { meal: "Biryani", instructions: "Serve with raita and salad" },
      night: { meal: "Dal Tadka with Jeera Rice", instructions: "Serve with papad" },
    },
    nonVeg: {
      morning: { meal: "Chicken Upma", instructions: "Serve with coconut chutney" },
      evening: { meal: "Mutton Biryani", instructions: "Serve with raita and salad" },
      night: { meal: "Chicken Dal Tadka with Jeera Rice", instructions: "Serve with papad" },
    },
  },
  Friday: {
    veg: {
      morning: { meal: "Paratha with Curd", instructions: "Serve with pickle" },
      evening: { meal: "Samosa with Chutney", instructions: "Serve with mint chutney" },
      night: { meal: "Butter Chicken with Naan", instructions: "Serve with onion salad" },
    },
    nonVeg: {
      morning: { meal: "Egg Paratha with Curd", instructions: "Serve with pickle" },
      evening: { meal: "Chicken Samosa with Chutney", instructions: "Serve with mint chutney" },
      night: { meal: "Butter Chicken with Naan", instructions: "Serve with onion salad" },
    },
  },
  Saturday: {
    veg: {
      morning: { meal: "Puri with Aloo Sabzi", instructions: "Serve with pickle" },
      evening: { meal: "Kebabs with Naan", instructions: "Serve with mint chutney" },
      night: { meal: "Rajma with Rice", instructions: "Serve with yogurt" },
    },
    nonVeg: {
      morning: { meal: "Chicken Puri with Aloo Sabzi", instructions: "Serve with pickle" },
      evening: { meal: "Kebabs with Naan", instructions: "Serve with mint chutney" },
      night: { meal: "Chicken Rajma with Rice", instructions: "Serve with yogurt" },
    },
  },
  Sunday: {
    veg: {
      morning: { meal: "Masala Dosa", instructions: "Serve with sambar and chutney" },
      evening: { meal: "Vada Pav", instructions: "Serve with chutney" },
      night: { meal: "Pulao with Raita", instructions: "Serve with papad" },
    },
    nonVeg: {
      morning: { meal: "Egg Masala Dosa", instructions: "Serve with sambar and chutney" },
      evening: { meal: "Chicken Vada Pav", instructions: "Serve with chutney" },
      night: { meal: "Chicken Pulao with Raita", instructions: "Serve with papad" },
    },
  }};

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
