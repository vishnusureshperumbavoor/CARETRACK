const express = require('express');
const multer = require('multer');
const { Patient } = require('./models');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, '/')
   },
   filename: function (req, file, cb) {
     cb(null, file.fieldname + '-' + Date.now())
   }
});

const upload = multer({ storage });
const router = express.Router();

router.post('/upload', upload.single('pdfFile'), async (req, res) => {
   const { patientName } = req.body;
   const pdfPath = req.file.path;

   const newPatient = new Patient({
     name: patientName,
     pdfPath,
   });

   try {
     await newPatient.save();
     res.json({ success: true, message: 'Patient and PDF uploaded successfully' });
   } catch (error) {
     console.error('Error saving patient to database:', error);
     res.status(500).json({ success: false, message: 'Error saving patient to database' });
   }
});

module.exports = router;
