import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';

import HomePage from './components/HomePage';


import Appdraw from './components/Appdraw';
import Showdata from './components/Showdata';
import Editdata from './components/Editdata';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';

function App() {
 return (
   <Router>
     <Appdraw />
     <Routes>
      
       <Route path="/" element={<HomePage />} />
       <Route path="showdata" element={<Showdata />} />
       <Route path="editdata" element={<Editdata />} />
       <Route path="register" element={<Register />} />
       <Route path="admin" element={<AdminLogin />} />
       <Route path="dashboard" element={<Dashboard/>} />
     </Routes>
   </Router>
 );

 
}


export default App;
