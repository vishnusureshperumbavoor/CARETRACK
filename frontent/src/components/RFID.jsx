import React, { useState } from 'react';
import Modal from 'react-modal';
import './css/RFID.css';
import io from 'socket.io-client';

const RFID = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rfidData, setRfidData] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  // Connect to the WebSocket server
  const socket = io('http://localhost:4000'); // Replace with your server address

  const handleScan = () => {
    if (!isScanning) {
      setIsScanning(true);
      // Emit a signal to the Arduino to start scanning
      socket.emit('startRFIDScan');

      // Listen for RFID data from the Arduino
      socket.on('rfidData', (data) => {
        setRfidData(data);
        setIsModalOpen(true); // Open the modal when RFID data is received
        setIsScanning(false); // Reset the scanning flag
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="scanButton" onClick={handleScan}>
        Scan the RFID
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Scanning Modal"
        className="modal"
      >
        <div>
          <h2>RFID Scanned</h2>
          <p>RFID Data: {rfidData}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default RFID;
