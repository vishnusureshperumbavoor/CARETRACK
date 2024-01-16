import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
   return (
    <div style={{ textAlign: 'center', backgroundColor: '#e0f7fa', padding: '280px'  }}>
    <h1 style={{ color: '#00838f',fontSize: '100px' }}>CareTrack</h1>
    <Link to="/admin">

</Link>

       </div>
   );
};

export default HomePage;
