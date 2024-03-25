import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';


const PatientInfo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [patientData, setPatientData] = useState({
    personalDetails: {
      id: "",
      name: "",
      gender: "",
      dob: "",
      age: "",
      place: ""
    },
    contactDetails: {
      phoneNumber: "",
      bystanderPhoneNumber: "",
      email: ""
    },
    medicalRecords: {
      allergies: "",
      treatments: "",
      medicalAlerts: "",
      principleDoctor: "",
      hospital: "",
      reasonForAdmission: "",
      principleDiagnosis: "",
      otherDiagnosis: "",
      operationProcedure: "",
      description: "",
      medicines: "",
      patientHistory: ""
    }
  });

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dob') {
      const dob = new Date(value);
      const today = new Date();
      const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
      setPatientData(prevData => ({
        ...prevData,
        personalDetails: {
          ...prevData.personalDetails,
          [name]: value,
          age: age.toString()
        }
      }));
    } else {
      setPatientData(prevData => ({
        ...prevData,
        personalDetails: {
          ...prevData.personalDetails,
          [name]: value
        }
      }));
    }
  };

  const handleContactDetailsChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prevData => ({
      ...prevData,
      contactDetails: {
        ...prevData.contactDetails,
        [name]: value
      }
    }));
  };

  const handleMedicalRecordsChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prevData => ({
      ...prevData,
      medicalRecords: {
        ...prevData.medicalRecords,
        [name]: value
      }
    }));
  };

  const handleSubmit = async () => {
    // Validation: Check if any required fields are empty

    for (const key in patientData.contactDetails) {
      if (patientData.contactDetails[key] === "") {
        alert(`Contact Details - ${key} is required.`);
        return;
      }
    }

    // If all required fields are filled, proceed with submission
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Image uploaded successfully');
      
      await axios.post('http://localhost:4000/api/patient', patientData);
      alert('Patient Data Saved Successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('An error occurred while saving changes. Please try again.');
    }
  };

  return (
    <div className="formContainer fade-in" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20px'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0px',
        padding: '20px',
        border: '20px solid #ccb',
        borderRadius: '50px',
        backgroundColor: '#ADD8E6',
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Enter RFID</h1>
        <Grid container spacing={3}>

          {/* RFID Details */}
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="RFID *" name="rfid" value={patientData.contactDetails.phoneNumber} onChange={handleContactDetailsChange} />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12}>
            <div style={{ marginBottom: '50px' }}>
              <Button variant="contained" color='success' onClick={handleSubmit}>Save</Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PatientInfo;
