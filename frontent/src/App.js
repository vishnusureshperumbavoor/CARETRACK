import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';

import ExistingUser from './components/ExistingUser';
import NewUser from './components/NewUser';
import Appdraw from './components/Appdraw';

function App() {
 return (
   <Router>
     <Appdraw />
     <Routes>
      
       <Route path="/" element={<HomePage />} />
       <Route path="/existinguser" element={<ExistingUser />} />
       <Route path="/newuser" element={<NewUser />} />
     </Routes>
   </Router>
 );
}

export default App;
