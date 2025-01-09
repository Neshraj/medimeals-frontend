import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import pantryStaffDetails from "../data/pantryStafdetails";
import "react-toastify/dist/ReactToastify.css";
import "../styles/InnerPantry.css";

function InnerPantry() {
  const [staffList, setStaffList] = useState(pantryStaffDetails);
  const [newStaff, setNewStaff] = useState({ name: "", contact: "", location: "" });
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStaff = () => {
    const { name, contact, location } = newStaff;
    if (!name || !contact || !location) {
      toast.info("Fill all fields!");
      return;
    }
    setStaffList((prev) => [...prev, newStaff]);
    setNewStaff({ name: "", contact: "", location: "" });
    setShowForm(false);
    toast.success("Staff added successfully!");
  };

  const handleStaffClick = (staff) => {
    navigate("/manager/pantry-details", { state: { staff } });
  };

  return (
    <div className="inner-pantry-container">
      <ToastContainer position="top-center" autoClose={2000} draggable />
      <button className="add-staff-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Staff"}
      </button>

      {showForm && (
        <div className="add-staff-form">
          <h3>Add New Staff</h3>
          <input
            type="text"
            name="name"
            placeholder="Staff Name"
            value={newStaff.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Info"
            value={newStaff.contact}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newStaff.location}
            onChange={handleInputChange}
          />
          <button className="submit-btn" onClick={handleAddStaff}>
            Add Staff
          </button>
        </div>
      )}

      <div className="staff-list">
        <h2>Pantry Staff Details</h2>
        {staffList.map((staff, index) => (
          <div
            key={index}
            className="staff-card"
            onClick={() => handleStaffClick(staff)}
          >
            <p><strong>Name:</strong> {staff.name}</p>
            <p><strong>Contact:</strong> {staff.contact}</p>
            <p><strong>Location:</strong> {staff.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InnerPantry;
