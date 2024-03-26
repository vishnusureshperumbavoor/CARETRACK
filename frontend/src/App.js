import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Appdraw from './components/Appdraw';
import Editdata from './components/Editdata';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import ViewPatient from './components/ViewPatient';
import PatientInfo from './components/PatientInfo';
import About from './components/About';
import MedicalHistoryForm1 from './components/MedicalHistoryForm1';
import MedicalHistoryForm2 from './components/MedicalHistoryForm2';
import {  } from "react-pdf";

function App() {
 return (
   <Router>
     <Appdraw />
     <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="editdata" element={<Editdata />} />
       <Route path="register" element={<Register />} />
       <Route path="admin" element={<AdminLogin />} />
       <Route path="dashboard" element={<Dashboard/>} />
       <Route path="viewpatient" element={<ViewPatient/>} />
       <Route path="patientInfo" element={<PatientInfo/>} />
       <Route path="medicalHistory1" element={<MedicalHistoryForm1/>}/>
       <Route path="medicalHistory2" element={<MedicalHistoryForm2/>}/>
       <Route path="about" element={<About/>} />
     </Routes>
   </Router>
 );
}


export default App;
