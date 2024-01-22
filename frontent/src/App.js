import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';


import Appdraw from './components/Appdraw';
import Showdata from './components/Showdata';
import Editdata from './components/Editdata';

function App() {
 return (
   <Router>
     <Appdraw />
     <Routes>
      
       <Route path="/" element={<HomePage />} />
       <Route path="showdata" element={<Showdata />} />
       <Route path="editdata" element={<Editdata />} />
     </Routes>
   </Router>
 );

 
}


export default App;
