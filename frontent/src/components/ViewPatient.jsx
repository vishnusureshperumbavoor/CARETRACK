import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';

const ViewPatient = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/patient');
        setPatientData(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, []);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmSave = async () => {
    try {
      await axios.post('http://localhost:4000/api/patient/update', formData);
      setEditable(false);
      setConfirmDialogOpen(false);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('An error occurred while saving changes. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      personalDetails: {
        ...formData.personalDetails,
        [name]: value
      }
    };

    // Calculate age based on updated date of birth
    if (name === 'dob') {
      const dob = new Date(value);
      const today = new Date();
      const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
      updatedFormData.personalDetails.age = age.toString();
    }

    setFormData(updatedFormData);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : patientData ? (
        <div>
          <h1>Patient Details</h1>
          <h2>Personal details</h2>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <p>Id: {patientData.personalDetails.id}</p>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="name"
                label="Name"
                value={editable ? formData.personalDetails.name : patientData.personalDetails.name}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="gender"
                label="Gender"
                value={editable ? formData.personalDetails.gender : patientData.personalDetails.gender}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="dob"
                label="Date of Birth"
                type="date"
                value={editable ? formData.personalDetails.dob : patientData.personalDetails.dob}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="place"
                label="Place"
                value={editable ? formData.personalDetails.place : patientData.personalDetails.place}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
          </Grid>

          <h2>Contact Details</h2>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                value={editable ? formData.contactDetails.phoneNumber : patientData.contactDetails.phoneNumber}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="bystanderPhoneNumber"
                label="Bystander Phone"
                value={editable ? formData.contactDetails.bystanderPhoneNumber : patientData.contactDetails.bystanderPhoneNumber}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="email"
                label="Email Id"
                value={editable ? formData.contactDetails.email : patientData.contactDetails.email}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
          </Grid>

          <h2>Medical Records</h2>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="allergies"
                label="Allergies"
                value={editable ? formData.medicalRecords.allergies : patientData.medicalRecords.allergies}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="medicalAlerts"
                label="Medical Alerts"
                value={editable ? formData.medicalRecords.medicalAlerts : patientData.medicalRecords.medicalAlerts}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="principleDoctor"
                label="Principle Doctor"
                value={editable ? formData.medicalRecords.principleDoctor : patientData.medicalRecords.principleDoctor}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="hospital"
                label="Hospital"
                value={editable ? formData.medicalRecords.hospital : patientData.medicalRecords.hospital}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="reasonForAdmission"
                label="Reason For Admission"
                value={editable ? formData.medicalRecords.reasonForAdmission : patientData.medicalRecords.reasonForAdmission}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="principleDiagnosis"
                label="Principle Diagnosis"
                value={editable ? formData.medicalRecords.principleDiagnosis : patientData.medicalRecords.principleDiagnosis}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="otherDiagnosis"
                label="Other Diagnosis"
                value={editable ? formData.medicalRecords.otherDiagnosis : patientData.medicalRecords.otherDiagnosis}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="operationProcedure"
                label="Operation Procedure"
                value={editable ? formData.medicalRecords.operationProcedure : patientData.medicalRecords.operationProcedure}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="description"
                label="Description"
                value={editable ? formData.medicalRecords.description : patientData.medicalRecords.description}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="medicines"
                label="Medicines"
                value={editable ? formData.medicalRecords.medicines : patientData.medicalRecords.medicines}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="patientHistory"
                label="Patient History"
                value={editable ? formData.medicalRecords.patientHistory : patientData.medicalRecords.patientHistory}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="treatments"
                label="Treatment"
                value={editable ? formData.medicalRecords.treatments : patientData.medicalRecords.treatments}
                onChange={handleChange}
                disabled={!editable}
                fullWidth
              />
            </Grid>
          </Grid>

          <div style={{ marginTop: '20px' }}>
            {editable ? (
              <Button variant="contained" sx={{ mr: 2, bgcolor: green[500] }} onClick={handleSave}>Save</Button>
            ) : (
              <Button variant="contained" sx={{ mr: 2 }} onClick={handleEdit}>Edit</Button>
            )}
          </div>
        </div>
      ) : (
        <p>No patient data found.</p>
      )}

      {/* Confirmation Dialog */}
      {confirmDialogOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0.5, 0, 0, 0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#e0f7fa', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
            <p>Are you sure you want to save changes?</p>
            <Button variant="contained" sx={{ mr: 2 }} onClick={handleConfirmSave}>Yes</Button>
            <Button variant="contained" onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPatient;
