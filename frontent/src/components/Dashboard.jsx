import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle special cases separately
    if (name === 'gender') {
      setPatientData(prevData => ({
        ...prevData,
        personalDetails: {
          ...prevData.personalDetails,
          gender: value,
        }
      }));
    } else if (name === 'dob') {
      setPatientData(prevData => ({
        ...prevData,
        personalDetails: {
          ...prevData.personalDetails,
          dob: value,
          age: calculateAge(value),
        }
      }));
    } else {
      const [section, field] = name.split('.');

      // Ensure section exists in patientData before updating state
      if (patientData.hasOwnProperty(section)) {
        setPatientData(prevData => ({
          ...prevData,
          [section]: {
            ...prevData[section],
            [field]: value,
          }
        }));
      }
      // Handle case where section doesn't exist in patientData (optional)
      else {
        console.error(`Invalid section: ${section}`);
      }
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/patient', patientData);
      if (response.data.success) {
        alert('Patient data submitted successfully!');
        console.log(patientData);
      } else {
        alert('Error: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error submitting patient data:', error);
      alert('An error occurred while submitting the data. Please try again.');
    }
  };

  return (
    <div className="formContainer fade-in">
      <div style={{
        maxWidth: '1000px',
        margin: '200px',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#ADD8E6',
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>MEDICAL REPORT</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Personal Details */}
            <Grid item xs={12}>
              <h2>Personal details</h2>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Id No" name="personalDetails.id" required value={patientData.personalDetails.id} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Name" name="personalDetails.name" required value={patientData.personalDetails.name} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Gender" name="gender" required select value={patientData.personalDetails.gender} onChange={handleChange}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Date of Birth" name="dob" type="date" required value={patientData.personalDetails.dob} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Age" name="age" value={patientData.personalDetails.age} readOnly />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Place" name="personalDetails.place" required value={patientData.personalDetails.place} onChange={handleChange} />
            </Grid>

            {/* Contact Details */}
            <Grid item xs={12}>
              <h2>Contact Details</h2>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Phone Number" name="contactDetails.phoneNumber" required value={patientData.contactDetails.phoneNumber} onChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Bystander Phone" name="contactDetails.bystanderPhoneNumber" required value={patientData.contactDetails.bystanderPhoneNumber} onChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Email Id" name="contactDetails.email" required value={patientData.contactDetails.email} onChange={handleChange} />
            </Grid>

            {/* Medical Records */}
            <Grid item xs={12}>
              <h2>Medical Records</h2>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Allergy" name="medicalRecords.allergies" required value={patientData.medicalRecords.allergies} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Medical Alerts" name="medicalRecords.medicalAlerts" required value={patientData.medicalRecords.medicalAlerts} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Principle Doctor" name="medicalRecords.principleDoctor" required value={patientData.medicalRecords.principleDoctor} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Hospital" name="medicalRecords.hospital" required value={patientData.medicalRecords.hospital} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Reason For Admission" name="medicalRecords.reasonForAdmission" required value={patientData.medicalRecords.reasonForAdmission} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Principle Diagnosis" name="medicalRecords.principleDiagnosis" required value={patientData.medicalRecords.principleDiagnosis} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Other Diagnosis" name="medicalRecords.otherDiagnosis" required value={patientData.medicalRecords.otherDiagnosis} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Operation Procedure" name="medicalRecords.operationProcedure" required value={patientData.medicalRecords.operationProcedure} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="medicalRecords.description" required value={patientData.medicalRecords.description} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Medicines" name="medicalRecords.medicines" required value={patientData.medicalRecords.medicines} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Patient History" name="medicalRecords.patientHistory" required value={patientData.medicalRecords.patientHistory} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Treatment" name="medicalRecords.treatments" required value={patientData.medicalRecords.treatments} onChange={handleChange} />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12}>
              <div style={{ marginBottom: '50px' }}>
                <button type="submit">Save</button>
                <button type="reset">Reset</button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
