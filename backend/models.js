const mongoose = require('./db');

const User = mongoose.model('User', new mongoose.Schema({
   username: String,
   password: String,
}));

const FileInfo = mongoose.model('FileInfo', new mongoose.Schema({
   filename: String,
   fileId: String,
   uploadDate: Date,
}));



const patientSchema = new mongoose.Schema({
    rfidValue: String, // Adjust based on the RFID data type
    name: String,
    pdfPath: String,
  });
  
  const Patient = mongoose.model('Patient', patientSchema);
  

module.exports = { User, FileInfo, Patient };
