
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/InnerPantry.css";

function DeliveryDetals() {
  const baseURL = "http://localhost:5000";
  const [staffList, setStaffList] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: "", contact: "", location: "", email: "", password: "" });
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPantryStaff = async () => {
      try {
        const response = await fetch(`${baseURL}/getdeliverystaffdata`);
        const data = await response.json();
        setStaffList(data); // Set pantry staff data to state
      } catch (error) {
        console.error("Error fetching pantry staff:", error);
      }
    };

    fetchPantryStaff();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleStaffClick = (staff) => {
    console.log('tosend ',staff);
    
    navigate("/pantry/delivery-status", {state: { email: staff } });
  };

  return (
    <div className="inner-pantry-container">
      <ToastContainer position="top-center" autoClose={2000} draggable />
      <div className="staff-list">
        <h2>Delivery Staff Details</h2>
        {staffList.map((staff, index) => (
          <div
            key={index}
            className="staff-card"
            onClick={() => handleStaffClick(staff.email)}
          >
            <p><strong>Name:</strong> {staff.name}</p>
            <p><strong>Contact:</strong> {staff.contact}</p>
            <p><strong>Location:</strong> {staff.location}</p>
            <p><strong>Email:</strong> {staff.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeliveryDetals;
