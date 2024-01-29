const express = require('express');
const app = express();
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// Create a serial port instance
const port = new SerialPort('/dev/tty-usbserial1', { baudRate: 9600 });

// Create a parser instance
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// When data is received from the Arduino, send it to the client
parser.on('data', (data) => {
 console.log(`Received data from Arduino: ${data}`);
});

app.get('/data', (req, res) => {
 parser.once('data', (data) => {
    res.send(data);
 });
});

app.listen(3000, () => {
 console.log('Server is listening on port 3000');
});
