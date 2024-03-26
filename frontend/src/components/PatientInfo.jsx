import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const PatientInfo = () => {
  const [rfidData, setRfidData] = useState("");

  const handleContactDetailsChange = (e) => {
    const { value } = e.target;
    setRfidData(value);
  };

  const handleSubmit = async () => {
    if (rfidData === "5A686612") {
      window.location.href = "/medicalHistory1";
    } else if (rfidData === "6A795480") {
      window.location.href = "/medicalHistory2";
    } else {
      alert("Invalid RFID data");
    }
  };

  return (
    <div
      className="formContainer fade-in"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0px",
          padding: "20px",
          border: "20px solid #ccb",
          borderRadius: "50px",
          backgroundColor: "#ADD8E6",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
          Enter RFID
        </h1>
        <Grid container spacing={3}>
          {/* RFID Details */}
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="RFID *"
              name="rfid"
              value={rfidData}
              onChange={handleContactDetailsChange}
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12}>
            <div style={{ marginBottom: "50px" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PatientInfo;
