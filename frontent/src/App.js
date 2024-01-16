import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Admin from './components/Admin';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/" element={<HomePage />} />
          </Routes>
      </Router>
  );
}

export default App;