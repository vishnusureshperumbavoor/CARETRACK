import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';

import HomePage from './components/HomePage';


import Appdraw from './components/Appdraw';
import Editdata from './components/Editdata';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import ViewPatient from './components/ViewPatient';



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
      
      
     </Routes>
   </Router>
 );

 
}


export default App;
