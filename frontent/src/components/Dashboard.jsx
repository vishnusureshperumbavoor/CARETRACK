import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

const Dashboard = () => {
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
          age: age.toString()  // Convert age to string and update the state
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
    try {
      await axios.post('http://localhost:4000/api/patient/personalDetails', patientData.personalDetails);
      await axios.post('http://localhost:4000/api/patient/contactDetails', patientData.contactDetails);
      await axios.post('http://localhost:4000/api/patient/medicalRecords', patientData.medicalRecords);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('An error occurred while saving changes. Please try again.');
    }
  };

  return (
    <div className="formContainer fade-in">
      <div style={{
        maxWidth: '1000px',
        margin: '0px',
        padding: '20px',
        border: '20px solid #ccc',
        borderRadius: '50px',
        backgroundColor: '#ADD8E6',
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>MEDICAL REPORT</h1>
        <Grid container spacing={3}>
          {/* Personal Details */}
          <Grid item xs={12}>
            <h2>Personal details</h2>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Id No" name="id" value={patientData.personalDetails.id} onChange={handlePersonalDetailsChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Name" name="name" value={patientData.personalDetails.name} onChange={handlePersonalDetailsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Gender" name="gender" select value={patientData.personalDetails.gender} onChange={handlePersonalDetailsChange}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Date of Birth" name="dob" type="date" value={patientData.personalDetails.dob} onChange={handlePersonalDetailsChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Age" name="age" value={patientData.personalDetails.age} onChange={handlePersonalDetailsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Place" name="place" value={patientData.personalDetails.place} onChange={handlePersonalDetailsChange} />
          </Grid>

          {/* Contact Details */}
          <Grid item xs={12}>
            <h2>Contact Details</h2>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Phone Number" name="phoneNumber" value={patientData.contactDetails.phoneNumber} onChange={handleContactDetailsChange} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Bystander Phone" name="bystanderPhoneNumber" value={patientData.contactDetails.bystanderPhoneNumber} onChange={handleContactDetailsChange} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Email Id" name="email" value={patientData.contactDetails.email} onChange={handleContactDetailsChange} />
          </Grid>

          {/* Medical Records */}
          <Grid item xs={12}>
            <h2>Medical Records</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Allergy" name="allergies" value={patientData.medicalRecords.allergies} onChange={handleMedicalRecordsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Medical Alerts" name="medicalAlerts" value={patientData.medicalRecords.medicalAlerts} onChange={handleMedicalRecordsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Principle Doctor" name="principleDoctor" value={patientData.medicalRecords.principleDoctor} onChange={handleMedicalRecordsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Hospital" name="hospital" value={patientData.medicalRecords.hospital} onChange={handleMedicalRecordsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Reason For Admission" name="reasonForAdmission" value={patientData.medicalRecords.reasonForAdmission} onChange={handleMedicalRecordsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Principle Diagnosis" name="principleDiagnosis" value={patientData.medicalRecords.principleDiagnosis} onChange={handleMedicalRecordsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Other Diagnosis" name="otherDiagnosis" value={patientData.medicalRecords.otherDiagnosis} onChange={handleMedicalRecordsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Operation Procedure" name="operationProcedure" value={patientData.medicalRecords.operationProcedure} onChange={handleMedicalRecordsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Description" name="description" value={patientData.medicalRecords.description} onChange={handleMedicalRecordsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Medicines" name="medicines" value={patientData.medicalRecords.medicines} onChange={handleMedicalRecordsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Patient History" name="patientHistory" value={patientData.medicalRecords.patientHistory} onChange={handleMedicalRecordsChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Treatment" name="treatments" value={patientData.medicalRecords.treatments} onChange={handleMedicalRecordsChange} />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12}>
            <div style={{ marginBottom: '50px' }}>
              <button onClick={handleSubmit}>Save</button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
