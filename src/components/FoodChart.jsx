import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../styles/FoodChart.css";

function FoodChart() {
  const baseURL = "http://localhost:5000";
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [mealType, setMealType] = useState("veg");
  const [mealPlans, setMealPlans] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await fetch(`${baseURL}/mealdata`);
        const data = await response.json();

        // Transform data into the desired format (if necessary)
        const formattedData = data.reduce((acc, item) => {
          acc[item.day] = item.meals;
          return acc;
        }, {});

        setMealPlans(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };

    fetchMealPlans();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedMealPlan = mealPlans[selectedDay];
  
    try {
      const response = await fetch(`${baseURL}/updatemealplane`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: selectedDay,
          meals: updatedMealPlan,
        }),
      });
      const data = await response.json();
  
      if (response.ok) {
        if(data.message === "Meal plan updated successfully"){
          toast.success(data.message);
        }
        else{
          toast.error(data.message);
        }
      } else {
        toast.error("Failed to update meal plan");
      }
    } catch (error) {
      console.error("Error updating meal plan:", error);
    }
  };
  

  if (loading) {
    return <div>Loading meal plans...</div>;
  }

  return (
    <div className="food-chart-container">
      <ToastContainer 
              position="top-center" 
              autoClose={2000} 
              draggable
      />
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
                value={mealPlans[selectedDay][mealType][mealTime]?.meal || ""}
                onChange={(e) => handleInputChange(e, mealTime)}
              />
            </label>
            <label>
              Instructions:
              <input
                type="text"
                name="instructions"
                value={mealPlans[selectedDay][mealType][mealTime]?.instructions || ""}
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
