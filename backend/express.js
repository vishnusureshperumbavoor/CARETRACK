const express = require('express');
const SerialPort = require('serialport');

const app = express();
const port = 3001;

const serialPort = new SerialPort('COM3', { baudRate: 9600 }); // Replace 'COM3' with your NodeMCU port

app.use(express.json());

app.post('/scan', (req, res) => {
  const { signal } = req.body;

  // Send signal to NodeMCU
  serialPort.write(signal, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Error sending signal to Arduino');
    }

    res.status(200).send('Signal sent successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
