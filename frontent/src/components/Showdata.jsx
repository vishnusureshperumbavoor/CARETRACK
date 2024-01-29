import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';

function Showdata() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    // Fetch patients from the backend
    axios.get('http://localhost:4000/patients')
      .then(response => setPatients(response.data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <h1>Patient PDF Viewer</h1>
      <div>
        <h2>Patients</h2>
        <ul>
          {patients.map(patient => (
            <li key={patient._id} onClick={() => handlePatientClick(patient)}>
              {patient.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedPatient && (
        <div>
          <h2>{selectedPatient.name}</h2>
          <Document
  file={`http://localhost:4000/${selectedPatient.pdfPath}`}
  onLoadSuccess={onDocumentLoadSuccess}
  pdfjs={{ workerSrc: 'pdfjs-dist/build/pdf.worker.min.js' }}
>
  <Page pageNumber={pageNumber} />
</Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      )}
    </div>
  );
}

export default Showdata;
