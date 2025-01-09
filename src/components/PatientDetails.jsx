import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/PatientDetails.css";

function PatientDetails() {
  const baseURL = "http://localhost:5000";
  const [allPatientDetails, setAllPatientDetails] = useState([]);
  const [filteredData, setFilteredData] = useState([allPatientDetails]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`${baseURL}/getpatientsdetails`);
        const data = await response.json();
        setAllPatientDetails(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    let updatedData;

    switch (value) {
      case "age-asc":
        updatedData = [...filteredData].sort((a, b) => a.age - b.age);
        break;
      case "age-desc":
        updatedData = [...filteredData].sort((a, b) => b.age - a.age);
        break;
      case "male":
        updatedData = allPatientDetails.filter((patient) => patient.gender === "male");
        break;
      case "female":
        updatedData = allPatientDetails.filter((patient) => patient.gender === "female");
        break;
      case "veg":
        updatedData = allPatientDetails.filter((patient) => patient.mealtype === "veg");
        break;
      case "non-veg":
        updatedData = allPatientDetails.filter((patient) => patient.mealtype === "non-veg");
        break;
      default:
        updatedData = allPatientDetails; // Reset to all data
        break;
    }

    setFilteredData(updatedData);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = allPatientDetails.filter((patient) => {
      return (
        patient.name.toLowerCase().includes(query) ||
        patient.contact.toString().includes(query) ||
        patient.admitionno.toString().includes(query)
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div className="patient-details-container">
      <div className="filter-search-container">
        <div className="filter-container">
          <select id="filter" onChange={handleFilterChange} className="filter-select">
            <option value="all">Reset Filters</option>
            <option value="age-asc">Sort by Age (Ascending)</option>
            <option value="age-desc">Sort by Age (Descending)</option>
            <option value="male">Filter by Male</option>
            <option value="female">Filter by Female</option>
            <option value="veg">Filter by Veg</option>
            <option value="non-veg">Filter by Non-Veg</option>
          </select>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Name, Contact, or Admission No."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      <div className="patients-list">
        {filteredData.map((patient, index) => (
          <div
            key={index}
            className="patient-card"
            onClick={() => navigate("/manager/patient-info", { state: { patient } })}
          >
            <p className="patient-info">
              <strong>Name:</strong> {patient.name} <br />
              <strong>Admition No:</strong> {patient.admitionno}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientDetails;
