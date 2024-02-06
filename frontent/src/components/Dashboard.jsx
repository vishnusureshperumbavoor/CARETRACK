import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';


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
    
     
    <div   className="formContainer fade-in">
      <div  style={{
        maxWidth: '1000px',
        margin: '200px',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#ADD8E6',
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>MEDICAL REPORT</h1>
        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <h1>Personal details</h1>
         
          <div style={{ marginRight: '40px' }}>
            <label>Id No:</label>

           <input type="text" name="personalDetails.id"  required value={patientData.personalDetails.id} onChange={handleChange}  /> 
           
           
           
           
          <label>Name:</label>
            <input type="text"  name="personalDetails.name" required value={patientData.personalDetails.name} onChange={handleChange} />

           {/* Add spacing here */}
           <div style={{ marginRight: '400px' }}>
              <label>Gender:</label>
              <div>
                <label>
                  
                  
                  <input required
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={patientData.personalDetails.gender === 'Male'}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input required
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={patientData.personalDetails.gender === 'Female'}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label>
                  <input required
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={patientData.personalDetails.gender === 'Other'}
                    onChange={handleChange}
                  />
                  Other
                </label>
              </div>
            </div>
            {/* Add spacing here */}
          
            <label>Date of Birth:</label>
            <input style={{ marginBottom: '15px' }} type="date" name="dob" required value={patientData.personalDetails.dob} onChange={handleChange} />
      

            <label>Age:</label>
            <input style={{ marginBottom: '15px' }} type="text" required name="age" value={patientData.personalDetails.age} readOnly />

            <label>Place:</label>
            <input style={{ marginBottom: '15px' }} type="text" name="personalDetails.place" required value={patientData.personalDetails.place} onChange={handleChange} />

            {/* Add other personal details fields here */}
          </div>

          {/* Contact Details */}
          <h1>Contact Details</h1>
          <div style={{ marginBottom: '40px' }}>
            <label>Phone Number:</label>
            <input type="number" name="contactDetails.phoneNumber" required value={patientData.contactDetails.phoneNumber} onChange={handleChange} />

            <label>Bystander Phone:</label>
            <input style={{ marginBottom: '15px' }} type="number" name="contactDetails.bystanderPhoneNumber" required value={patientData.contactDetails.bystanderPhoneNumber} onChange={handleChange} />

            <label>Email Id:</label>
            <input style={{ marginBottom: '15px' }} type="email" name="contactDetails.email" required value={patientData.contactDetails.email} onChange={handleChange} />
            {/* Add other contact details fields here */}
          </div>

          {/* Medical Records */}
          <h1>Medical Records</h1>
          <div style={{ marginBottom: '40px' }}>
            <label>Allergy:</label>
            <input type="text" name="medicalRecords.allergies" required value={patientData.medicalRecords.allergies} onChange={handleChange} />

            <label>Medical Alerts:</label>
            <input style={{ marginBottom: '15px' }} type="text" name="medicalRecords.medicalAlerts" required value={patientData.medicalRecords.medicalAlerts} onChange={handleChange} />

            <label>Principle Doctor:</label>
            <input style={{ marginBottom: '15px' }} type="text" name="medicalRecords.principleDoctor" required value={patientData.medicalRecords.principleDoctor} onChange={handleChange} />

            <label>Hospital:</label>
            <input style={{ marginBottom: '15px' }} type="text" name="medicalRecords.hospital" required value={patientData.medicalRecords.hospital} onChange={handleChange} />

            <label>Reason For Admission:</label>
            <input style={{ marginBottom: '15px' }} type="text" name="medicalRecords.reasonForAdmission" required value={patientData.medicalRecords.reasonForAdmission} onChange={handleChange} />

            <label>Principle Diagnosis:</label>
            <input style={{ marginBottom: '15px' }} type="text" name="medicalRecords.principleDiagnosis" required value={patientData.medicalRecords.principleDiagnosis} onChange={handleChange} />

            <label>Other Diagnosis:</label>
            <input style={{ marginBottom: '15px' }} type="text" name="medicalRecords.otherDiagnosis" required value={patientData.medicalRecords.otherDiagnosis} onChange={handleChange} />

            <label>Operation Procedure:</label>
            <input style={{ marginBottom: '15px' }} type="text" name="medicalRecords.operationProcedure" required value={patientData.medicalRecords.operationProcedure} onChange={handleChange} />

            <label>Description:</label>
            <input style={{ marginBottom: '15px' }} type="text" name="medicalRecords.description" required value={patientData.medicalRecords.description} onChange={handleChange} />

            <label>Medicines:</label>
            <input style={{ marginBottom: '15px' }} type="text" name="medicalRecords.medicines" required value={patientData.medicalRecords.medicines} onChange={handleChange} />

            <label>Patient History:</label>
            <input style={{ marginBottom: '15px' }} type="text" name="medicalRecords.patientHistory" required value={patientData.medicalRecords.patientHistory} onChange={handleChange} />

            <label>Treatment:</label>
            <input style={{ marginBottom: '15px' }} type="text" name="medicalRecords.treatments" required value={patientData.medicalRecords.treatments} onChange={handleChange} />

            {/* Add other medical records fields here */}
          </div>

          <div style={{ marginBottom: '50px' }}>
            <button type="submit">Save</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      </div>
    </div>
   
  );
};

export default Dashboard;
