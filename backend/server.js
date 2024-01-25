const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://akshaymmaimbilly:akshaymm@cluster0.iyvhtug.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { });

const conn = mongoose.connection;

conn.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

conn.once('open', () => {
  console.log('Connected to MongoDB');

  // GridFS setup
  // const gfs = Grid(conn.db, mongoose.mongo);
  // gfs.collection('uploads');

  const storage = new GridFsStorage({
    url: mongoURI,
    cache: true,
    file: (req, file) => {
      // instead of an object a string is returned
      return 'file_' + Date.now();
    },
  });

  const upload = multer({ storage });

  // Define models
  const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
  }));

  const Admin = mongoose.model('Admin', new mongoose.Schema({
    username: String,
    password: String,
  }));

  const FileInfo = mongoose.model('FileInfo', new mongoose.Schema({
    filename: String,
    fileId: String,
    uploadDate: Date,
  }));

  const Patient = mongoose.model('Patient', new mongoose.Schema({
    patientName: String,
    pdfFile: String,
  }));

  // API endpoint for handling form data // upload.single('file')
  app.post('/api/patient/add', async (req, res) => {
    console.log("hi hello")
    console.log(req.pdfFile)
    try {
      const { patientName } = req.body;

      // Save patient data in MongoDB
      const newPatient = new Patient({
        patientName: patientName,
        pdfFile: req.pdfFile,
      });

      await newPatient.save();

      res.json({ success: true });
    } catch (error) {
      console.error('Error during patient data saving:', error.message);
      res.json({ success: false, error: error.message });
    }
  });

  // User Register
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

  // User Login
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

  // File Upload
  app.post('/uploadFile', upload.single('file'), async (req, res) => {
    console.log("app post")
    console.log(req.file)
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      // Save file information to MongoDB
      const fileInfo = {
        filename: req.file.filename,
        id: req.file.filename + "_" + new Date(),
        fileId: req.file.id,
        uploadDate: new Date(),
      };

      console.log(fileInfo)
      const fileInfoModel = new FileInfo(fileInfo);
      await fileInfoModel.save();

      return res.status(201).json({ success: true, message: "File uploaded", fileInfo });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

  const port = 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
