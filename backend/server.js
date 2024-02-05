const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://akshaymmaimbilly:akshaymm@cluster0.iyvhtug.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connection.once('open', async () => {
  console.log('Connected to MongoDB');

  // Define Patient Schema
  const patientSchema = new mongoose.Schema({
    id: Number,
    name: String,
    gender: String,
    dob: String,
    phoneno: Number,
    bystanderph: Number,
    email: String,
    age: Number,
    place: String,
    height: Number,
    weight: Number,
    hospital: String,
    treatment: String,
    allergies: String,
    medicalalerts: String,
    principledoctor: String,
    reasonforadmission: String,
    principlediagnosis: String,
    secondarydiagnosis: String,
    otherdiagnosis: String,
    operationprocedure: String,
    description: String,
    medicine: String,
    patienthistory: String,
  });

  const Patient = mongoose.model('Patient', patientSchema);

  // Define User Schema
  const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  const User = mongoose.model('User', userSchema);

  // User Registration Endpoint
  app.post('/api/user/register', async (req, res) => {
    const { username, password } = req.body;

    try {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.json({ success: false, message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user registration:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // User Login Endpoint
  app.post('/api/user/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });

  

  app.post('/api/patient', async (req, res) => {
   try {
      const { dob, ...patientData } = req.body;
      if (dob) {
        patientData.age = calculateAge(dob);
      }
      const newPatient = new Patient(patientData);
      await newPatient.save();
      res.status(200).json({ message: 'Patient data saved successfully' });
   } catch (error) {
      console.error('Error saving patient data', error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
  });
  
  const calculateAge = (dob) => {
   const birthDate = new Date(dob);
   const today = new Date();
   return today.getFullYear() - birthDate.getFullYear();
  };
  
  // Server Listening
  const port = 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
