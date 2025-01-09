import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../styles/PatientInfo.css";

function PatientInfo() {
  const baseURL = "http://localhost:5000";
  const location = useLocation();
  const { patient } = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [updatedPatient, setUpdatedPatient] = useState(patient);

  if (!patient) {
    return <p>No patient data available.</p>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${baseURL}/updatepatientdetail`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPatient),
      });
  
      if (response.ok) {
        const result = await response.json();
        if(result.message==='Patient details updated successfully'){
          toast.success('Patient details updated successfully');
        }
        else if(result.message==='No changes made'){
          toast.info('No changes made');
        }
        else if(result.message==='Error updating patient details'){
          toast.error('Error updating patient details');
        }

        else{
          toast.error('Failed to update patient details');
        }
        setIsEditing(false);
      } else {
        toast.error('Failed to update patient details');
      }
    } catch (error) {
      toast.error('Error updating patient details:');
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPatient({
      ...updatedPatient,
      [name]: value,
    });
  };

  return (
    <div className="patient-info-container">
      <ToastContainer 
              position="top-center" 
              autoClose={2000} 
              draggable
      />
      <h2 className="patient-info-title">Patient Information</h2>

      <div className="patient-info-buttons">
        <button className="edit-button" onClick={handleEdit} disabled={isEditing}>
          Edit
        </button>
        <button className="save-button" onClick={handleSave} disabled={!isEditing}>
          Save
        </button>
      </div>

      <div className="patient-info-fields">
        <div className="field">
          <strong>Name:</strong>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={updatedPatient.name}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <span>{updatedPatient.name}</span>
          )}
        </div>

        <div className="field">
          <strong>Age:</strong>
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={updatedPatient.age}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <span>{updatedPatient.age}</span>
          )}
        </div>

        <div className="field">
          <strong>Gender:</strong>
          {isEditing ? (
            <input
              type="text"
              name="gender"
              value={updatedPatient.gender}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <span>{updatedPatient.gender}</span>
          )}
        </div>

        <div className="field">
          <strong>Contact:</strong>
          {isEditing ? (
            <input
              type="text"
              name="contact"
              value={updatedPatient.contact}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <span>{updatedPatient.contact}</span>
          )}
        </div>

        <div className="field">
          <strong>Emergency Contact:</strong>
          {isEditing ? (
            <input
              type="text"
              name="emergencycontact"
              value={updatedPatient.emergencycontact}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <span>{updatedPatient.emergencycontact}</span>
          )}
        </div>

        <div className="field">
          <strong>Admission No:</strong>
          {isEditing ? (
            <input
              type="text"
              name="admitionno"
              value={updatedPatient.admitionno}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <span>{updatedPatient.admitionno}</span>
          )}
        </div>

        <div className="field">
          <strong>Diseases:</strong>
          {isEditing ? (
            <input
              type="text"
              name="diseases"
              value={updatedPatient.diseases}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <span>{updatedPatient.diseases}</span>
          )}
        </div>

        <div className="field">
          <strong>Allergies:</strong>
          {isEditing ? (
            <input
              type="text"
              name="allergies"
              value={updatedPatient.allergies}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <span>{updatedPatient.allergies}</span>
          )}
        </div>

        <div className="field">
          <strong>Meal Type:</strong>
          {isEditing ? (
            <input
              type="text"
              name="mealtype"
              value={updatedPatient.mealtype}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <span>{updatedPatient.mealtype}</span>
          )}
        </div>

        <div className="field">
          <strong>Room No:</strong>
          {isEditing ? (
            <input
              type="text"
              name="rommno"
              value={updatedPatient.rommno}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <span>{updatedPatient.rommno}</span>
          )}
        </div>

        <div className="field">
          <strong>Floor No:</strong>
          {isEditing ? (
            <input
              type="text"
              name="floorno"
              value={updatedPatient.floorno}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <span>{updatedPatient.floorno}</span>
          )}
        </div>

        <div className="field">
          <strong>Bed No:</strong>
          {isEditing ? (
            <input
              type="text"
              name="bedno"
              value={updatedPatient.bedno}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <span>{updatedPatient.bedno}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientInfo;
