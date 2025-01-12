import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/InnerPantry.css";

function DeliveryDetails() {
  const baseURL = "https://medimealsbackend.onrender.com";
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPantryStaff = async () => {
      try {
        const response = await fetch(`${baseURL}/getdeliverystaffdata`);
        const data = await response.json();
        setStaffList(data);
      } catch (error) {
        toast.error("Error fetching delivery staff.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPantryStaff();
  }, []);

  const handleStaffClick = (staff) => {
    navigate("/pantry/delivery-status", { state: { email: staff.email } });
  };

  return (
    <div className="inner-pantry-container">
      <ToastContainer position="top-center" autoClose={2000} draggable />
      <div className="staff-list">
        <h2>Delivery Staff Details</h2>
        {isLoading ? (
          <p>Loading delivery staff details...</p>
        ) : staffList.length === 0 ? (
          <p>No delivery staff available.</p>
        ) : (
          staffList.map((staff, index) => (
            <div
              key={index}
              className="staff-card"
              onClick={() => handleStaffClick(staff)}
            >
              <p>
                <strong>Name:</strong> {staff.name}
              </p>
              <p>
                <strong>Contact:</strong> {staff.contact}
              </p>
              <p>
                <strong>Location:</strong> {staff.location}
              </p>
              <p>
                <strong>Email:</strong> {staff.email}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DeliveryDetails;
