import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
   return (
    <div style={{ textAlign: 'center', backgroundColor: '#e0f7fa', padding: '325px' }}>
    <h1 style={{ color: '#00838f',fontSize: '100px' }}>CareTrack</h1>
    <Link to="/admin">
 <button style={{
   backgroundColor: '#00796b',
   color: '#ffffff',
   padding: '10px 20px',
   fontSize: '16px',
   borderRadius: '5px',
   position: 'absolute',
   top: '10px',
   left: '10px',
   cursor: 'pointer',
   border: 'none',
 }}>
   Administration
 </button>
</Link>

       </div>
   );
};

export default HomePage;
