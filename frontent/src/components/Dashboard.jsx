// Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css'; // Import your CSS file for styling

const Dashboard = () => {
  const [patientName, setPatientName] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setPdfFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!patientName || !pdfFile) {
        alert('Please provide both patient name and upload a PDF file');
        return;
      }

      const formData = new FormData();
      formData.append('patientName', patientName);

      if (pdfFile.name) {
        formData.append('pdfFile', pdfFile, pdfFile.name);
      } else {
        alert('PDF file information is missing.');
        return;
      }

      const response = await axios.post('http://localhost:4000/api/patient/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Patient data added successfully');
      } else {
        alert('Failed to add patient data');
      }
    } catch (error) {
      console.error('Error during patient data submission:', error.message);
      alert('Network Error: Unable to reach the server');
    }
  };

  const handleLogout = () => {
    // Clear any user-related data (replace with your actual logout logic)
    // For example, if using localStorage for authentication token:
    localStorage.removeItem('authToken');

    // Redirect the user to the login page
    navigate('/admin'); // Replace '/login' with your actual login route
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div>
        <label>Patient Name:</label>
        <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
      </div>
      <div>
        <label>Upload PDF:</label>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      {/* Home Button */}
      <button className="home-button" onClick={navigateToHome}>Go Home</button>
    </div>
  );
};

export default Dashboard;
