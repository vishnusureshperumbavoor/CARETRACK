// Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [patientName, setPatientName] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    // Handle PDF file change
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('patientName', patientName);
      formData.append('pdfFile', pdfFile);

      // Send form data to server and save in MongoDB
      const response = await axios.post('http://localhost:4000/api/patient/add', formData);

      if (response.data.success) {
        alert('Patient data added successfully');
      } else {
        alert('Failed to add patient data');
      }
    } catch (error) {
      console.error('Error during patient data submission:', error.message);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <label>Patient Name:</label>
        <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
      </div>
      <div>
        <label>Upload PDF:</label>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Dashboard;
