// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const bcrypt = require('bcrypt');





const app = express();
app.use(cors());
app.use(bodyParser.json());





const mongoURI = 'mongodb+srv://akshaymmaimbilly:akshaymm@cluster0.iyvhtug.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', (err) => {
 console.error('MongoDB connection error:', err);
});

connection.once('open', async () => {
 console.log('Connected to MongoDB');

 


  const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
  }));

  const FileInfo = mongoose.model('FileInfo', new mongoose.Schema({
    filename: String,
    fileId: String,
    uploadDate: Date,
  }));


  
  
  app.get('/patients', async (req, res) => {
    try {
      const patients = await Patient.find();
      res.json(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ success: false, message: 'Error fetching patients' });
    }
  });


  
  


 // Set up multer for handling multipart/form-data
 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, '/')
  },
  filename: function (req, file, cb) {
     cb(null, file.fieldname + '-' + Date.now())
  }
 });
 
 const upload = multer({ storage });
 app.use('/uploads', express.static('uploads'));
 
 const Patient = mongoose.model('Patient', {
  name: String,
  pdfPath: String,
});

app.post('/upload', upload.single('pdfFile'), async (req, res) => {
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

  

  const port = 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});


