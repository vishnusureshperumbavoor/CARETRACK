import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [rfidValue, setRfidValue] = useState(null);

  const handleScan = async () => {
    try {
      const response = await axios.post('http://localhost:4000/check-rfid', { rfidValue });
      // Process the response, open modal, etc.
      console.log(response.data);
    } catch (error) {
      console.error('Error scanning RFID:', error);
    }
  };

  return (
    <div>
      <button onClick={handleScan}>Click Here</button>
    </div>
  );
};

export default App;
