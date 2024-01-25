import React, { useState } from 'react';
import Modal from 'react-modal';
import './css/RFID.css';

const RFID = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScan = () => {
    // Add RFID scanning logic here
    console.log('Scanning RFID...');
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
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
          <h2>Scanning RFID...</h2>
          {/* Add your scanning process UI here */}
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default RFID;
