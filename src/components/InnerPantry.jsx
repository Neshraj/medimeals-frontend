import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/InnerPantry.css";

function InnerPantry() {
  const baseURL = "https://medimealsbackend.onrender.com";
  const [staffList, setStaffList] = useState([]);
  const [newStaff, setNewStaff] = useState({
    name: "",
    contact: "",
    location: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPantryStaff = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/getpantrystaffdata`);
        const data = await response.json();
        setStaffList(data);
      } catch (error) {
        console.error("Error fetching pantry staff:", error);
        toast.error("Error fetching pantry staff.");
      } finally {
        setLoading(false);
      }
    };

    fetchPantryStaff();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStaff = async () => {
    const { name, contact, location, email, password } = newStaff;
    if (!name || !contact || !location || !email || !password) {
      toast.info("Fill all fields!");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/pantry-staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStaff),
      });

      if (response.ok) {
        const res = await response.json();
        if (res.message === "Staff added successfully") {
          setStaffList((prev) => [...prev, newStaff]);
          setNewStaff({
            name: "",
            contact: "",
            location: "",
            email: "",
            password: "",
          });
          setShowForm(false);
          toast.success(res.message);
        } else {
          toast.error("Failed to add staff");
        }
      } else {
        toast.error("Failed to add staff");
      }
    } catch (error) {
      console.error("Error adding staff:", error);
      toast.error("Error adding staff.");
    }
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
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newStaff.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newStaff.password}
            onChange={handleInputChange}
          />
          <button className="submit-btn" onClick={handleAddStaff}>
            Add Staff
          </button>
        </div>
      )}

      <div className="staff-list">
        <h2>Pantry Staff Details</h2>
        {loading ? (
          <p>Loading pantry staff details...</p>
        ) : staffList.length > 0 ? (
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
        ) : (
          <p>No staff details found.</p>
        )}
      </div>
    </div>
  );
}

export default InnerPantry;
