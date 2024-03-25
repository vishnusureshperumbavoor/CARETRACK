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
  const [fieldsChanged, setFieldsChanged] = useState({});
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/patient');
        setPatientData(response.data);
        setFormData(response.data);
        setLoading(false);
        if (response.data && response.data.imageUrl) {
          setImageUrl(response.data.imageUrl);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, []);

  useEffect(() => {
    if (patientData && formData) {
      const updatedFields = {};

      for (const key in patientData.personalDetails) {
        if (patientData.personalDetails[key] !== formData.personalDetails[key]) {
          updatedFields[`personalDetails.${key}`] = true;
        }
      }

      for (const key in patientData.contactDetails) {
        if (patientData.contactDetails[key] !== formData.contactDetails[key]) {
          updatedFields[`contactDetails.${key}`] = true;
        }
      }

      for (const key in patientData.medicalRecords) {
        if (patientData.medicalRecords[key] !== formData.medicalRecords[key]) {
          updatedFields[`medicalRecords.${key}`] = true;
        }
      }

      setFieldsChanged(updatedFields);
    }
  }, [patientData, formData]);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
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
      [name]: value
    };

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

          <div>
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
          </div>

          <Grid container spacing={2}>
            {Object.entries(patientData.personalDetails).map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <TextField
                  name={key}
                  label={key}
                  value={editable ? formData.personalDetails[key] : value}
                  onChange={handleChange}
                  disabled={!editable}
                  fullWidth
                  error={fieldsChanged[`personalDetails.${key}`]}
                />
              </Grid>
            ))}
          </Grid>

          <h2>Contact Details</h2>
          <Grid container spacing={2}>
            {Object.entries(patientData.contactDetails).map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <TextField
                  name={key}
                  label={key}
                  value={editable ? formData.contactDetails[key] : value}
                  onChange={handleChange}
                  disabled={!editable}
                  fullWidth
                  error={fieldsChanged[`contactDetails.${key}`]}
                />
              </Grid>
            ))}
          </Grid>

          <h2>Medical Records</h2>
          <Grid container spacing={2}>
            {Object.entries(patientData.medicalRecords).map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <TextField
                  name={key}
                  label={key}
                  value={editable ? formData.medicalRecords[key] : value}
                  onChange={handleChange}
                  disabled={!editable}
                  fullWidth
                  error={fieldsChanged[`medicalRecords.${key}`]}
                />
              </Grid>
            ))}
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
