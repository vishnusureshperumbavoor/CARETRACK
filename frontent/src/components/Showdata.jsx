import React, { useState, useEffect } from "react";
import axios from "axios";

const Showdata = () => {
 const [patientName, setPatientName] = useState("");
 const [pdfFile, setPdfFile] = useState(null);

 useEffect(() => {
   axios.get("/api/patient")
     .then(response => {
       setPatientName(response.data.patientName);
       setPdfFile(response.data.pdfFile);
     })
     .catch(error => console.error(error));
 }, []);

 const handleButtonClick = () => {
   // Handle button click
 };

 return (
   <div>
     <h3>{patientName}</h3>
     <button onClick={handleButtonClick}>View</button>
   </div>
 );
};

export default Showdata;
