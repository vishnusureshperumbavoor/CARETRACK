import React, { useEffect, useState } from 'react';

function App() {
 const [rfidData, setRfidData] = useState(null);

 const handleScan = async () => {
    try {
      const response = await fetch('http://192.168.1.80/scan');
      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      setRfidData(data);
    } catch (error) {
      console.error('Error:', error);
    }
 };

 return (
    <div className="App">
      <button onClick={handleScan}>Scan</button>
      {rfidData && <p>Scanned RFID Data: {rfidData}</p>}
    </div>
 );
}

export default App;
