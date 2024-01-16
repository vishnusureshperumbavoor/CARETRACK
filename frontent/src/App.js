import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Admin from './components/Admin';
import ExistingUser from './components/ExistingUser';
import NewUser from './components/NewUser';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/existinguser" element={<ExistingUser />} />
              <Route path="/newuser"element={<NewUser/>}/>
          </Routes>
      </Router>
  );
}

export default App;