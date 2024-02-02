
const axios = require('axios');




// RFID scanning endpoint
app.post('/check-rfid', async (req, res) => {
    try {
      const { rfidValue } = req.body;
  
      // Send RFID value to NodeMCU
      const nodeMCUResponse = await axios.post('http://localhost:5000/check-rfid', { rfidValue });
  
      // Process NodeMCU response, query MongoDB, and send the result back to React
      const patient = await Patient.findOne({ rfidValue });
  
      if (patient) {
        res.json({ exists: true, patient });
      } else {
        res.json({ exists: false });
      }
    } catch (error) {
      console.error('Error during RFID check:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });