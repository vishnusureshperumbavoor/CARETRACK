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
import Button from './components/Button';
import Ab from './components/Ab';
import Medical_History_Form1 from './components/Medical_History_Form1';

function App() {
 return (
   <Router>
     <Appdraw />
     <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="button" element={<Button />} />
       <Route path="editdata" element={<Editdata />} />
       <Route path="register" element={<Register />} />
       <Route path="admin" element={<AdminLogin />} />
       <Route path="dashboard" element={<Dashboard/>} />
       <Route path="viewpatient" element={<ViewPatient/>} />
       <Route path="patientInfo" element={<PatientInfo/>} />
       <Route path="medicalHistory1" element={<Medical_History_Form1/>}/>
       <Route path="about" element={<Ab/>} />
     </Routes>
   </Router>
 );
}


export default App;
