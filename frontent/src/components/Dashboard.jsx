import React, { useState } from 'react';
import axios from 'axios';
 

const Dashboard = () => {
  const [patientData, setPatientData] = useState({
    // Use descriptive variable names
    id: "",
    name: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    phoneNo: "",
    bystanderPhoneNumber: "",
    email: "",
    place: "",
    allergies: "",
    medicalalerts: "",
    principleDoctor: "",
    hospital: "",
    reasonForAdmission: "",
    principleDiagnosis: "",
    secondaryDiagnosis: "",
    otherDiagnosis: "",
    operationProcedure: "",
    description: "",
    medicines: "",
    patientHistory: "",
    treatment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prevData => ({
      ...prevData,
      [name]: value,
      age: name === 'dob' ? calculateAge(value) : prevData.age,
    }));
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
        // Apply consistent styling (refer to CSS file)
        maxWidth: '1000px',
        margin: 'auto',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#ADD8E6',
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>MEDICAL REPORT</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Id No:</label>
            <input type="text" name="id" required value={patientData.id} onChange={handleChange} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Name:</label>
            <input type="text" name="name" required value={patientData.name} onChange={handleChange} />
          </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Gender:</label>
          <div>
            <label>
              <input required
                type="radio"
                name="gender"
                value="Male"
                checked={patientData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input required
                type="radio"
                name="gender"
                value="Female"
                checked={patientData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input required
                type="radio"
                name="gender"
                value="Other"
                checked={patientData.gender === 'Other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>

        <label>Date of Birth:</label>
        <input style={{ marginBottom: '15px' }} type="date" name="dob"required label="Outlined" value={patientData.dob} onChange={handleChange} />

        <label>Age:</label>
        <input  style={{ marginBottom: '15px' }} type="text" required name="age" label="Outlined"value={patientData.age} readOnly />

        <label>Phone Number:</label>
        <input style={{ marginBottom: '15px' }} type="number" name="phoneno" required label="Outlined" value={patientData.phoneno} onChange={handleChange} />

        <label>Bystander Phone:</label>
        <input style={{ marginBottom: '15px' }}  type="number" name="bystanderph" required label="Outlined" value={patientData.bystanderph} onChange={handleChange} />

        <label>Email Id:</label>
        <input style={{ marginBottom: '15px' }} type="email" name="email" required label="Outlined" value={patientData.email} onChange={handleChange} />

      <label>Place:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="place" required label="Outlined" value={patientData.place} onChange={handleChange} />

      {/* <label>Allergy:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="allergy" required  label="Outlined" value={patientData.allergies} onChange={handleChange} /> */}

      {/* <label>Medicalallerts:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="medicalalert"required label="Outlined" value={patientData.medicalalerts} onChange={handleChange} /> */}

      <label>Principle Doctor:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="doctor" required label="Outlined" value={patientData.principlediagonasis} onChange={handleChange} />

      <label>Hospital:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="hospital" required label="Outlined" value={patientData.hospital} onChange={handleChange} />

      <label>Reson For Addmission:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="reson"required label="Outlined"value={patientData.reasonforadmission} onChange={handleChange} />

      <label>Principle Diaganosis:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="pridiaganosis" required label="Outlined"value={patientData.principlediagonasis} onChange={handleChange} />

      <label>Secondary Diagonosis:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="secdiaganosis"required label="Outlined"value={patientData.secondarydiagnosis} onChange={handleChange} />

      <label>Other Diaganosis:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="othdiaganosis" required label="Outlined"value={patientData.otherdiagnosis} onChange={handleChange} />

      <label>Operation Procedure:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="opprocedure" required label="Outlined"value={patientData.operationprocedure} onChange={handleChange} />

      <label>Description:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="description" required label="Outlined"value={patientData.description} onChange={handleChange} />

      <label>Medicines:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="medicine" required label="Outlined"value={patientData.medicine} onChange={handleChange} />

      <label>PatientHistory:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="patienthistory" required label="Outlined"value={patientData.patienthistory} onChange={handleChange} />

      <label>Treatment:</label>
      <input style={{ marginBottom: '15px' }} type="text" name="treatment" required label="Outlined"value={patientData.treatment} onChange={handleChange} />

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
