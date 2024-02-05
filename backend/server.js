const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const { GridFsStorage } = require('multer-gridfs-storage');
const bcrypt = require('bcrypt');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());



//......................................................




// MongoDB Connection
const mongoURI = 'mongodb+srv://akshaymmaimbilly:akshaymm@cluster0.iyvhtug.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connection.once('open', async () => {
  console.log('Connected to MongoDB');


//......................................................

// MongoDB Models and Schemas
const RfidSchema = new mongoose.Schema({
   rfid: String,
   data: String,
});

const Rfid = mongoose.model('Rfid', RfidSchema);


//pdf upload
const patientSchema = new mongoose.Schema({
  name: String,
  pdfPath: String,
  // other fields as needed
});
const Patient = mongoose.model('Patient', patientSchema);


  // MongoDB Models and Schemas
  const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
  }));

  const FileInfo = mongoose.model('FileInfo', new mongoose.Schema({
    filename: String,
    fileId: String,
    uploadDate: Date,
  }));


//rfid schema

const UserSchema = new mongoose.Schema({
  uid: String,
  // Other fields...
 });




//......................................................





  // Multer Setup
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  const upload = multer({ storage });
  app.use('/uploads', express.static('uploads'));


//......................................................


  // PDF Upload Endpoint
  app.post('/upload', upload.single('pdfFile'), async (req, res) => {
    const { patientName } = req.body;
    const pdfPath = req.file.path;

    const newPatient =  Patient({
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
//......................................................



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


  //......................................................




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
  
 //......................................................


 const UserModel = mongoose.model('Users', UserSchema);
 app.post('/button-click', async (req, res) => {
  try {
     // Send a request to NodeMCU
     const nodeResponse = await axios.post('http://192.168.0.1:80/scan-rfid');
 
     // Extract UID from the response
     const uid = nodeResponse.data.uid;
 
     // Check if UID exists in MongoDB
     const user = await UserModel.findOne({ uid: uid });
     if (user) {
       res.json({ exists: true });
     } else {
       res.json({ exists: false });
     }
  } catch (error) {
     console.error('Error communicating with NodeMCU:', error.message);
     res.status(500).json({ error: 'Failed to communicate with NodeMCU' });
  }
 });


//.........................................................

  // Server Listening
  const port = 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
