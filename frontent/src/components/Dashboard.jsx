// Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [patientName, setPatientName] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    // Handle PDF file change
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

      // Create a FormData object
      const formData = new FormData();
      formData.append('patientName', patientName);

      // Check if pdfFile has 'name' property before appending to FormData
      if (pdfFile.name) {
        formData.append('pdfFile', pdfFile, pdfFile.name);
      } else {
        alert('PDF file information is missing.');
        return;
      }

      // Make the API request using axios
      const response = await axios.post('http://localhost:4000/api/patient/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for FormData
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
