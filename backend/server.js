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

connection.once('open', () => {
  console.log('Connected to MongoDB');

  const storage = new GridFsStorage({
    url: mongoURI,
    cache: true,
    file: (req, file) => {
      return {
        filename: 'file_' + Date.now(),
        bucketName: 'uploads',
      };
    },
  });

  const upload = multer({ storage });

  const User = mongoose.model('User', new mongoose.Schema({
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
    pdfFileId: String, // Store the GridFS file ID
  }));

  app.post('/api/patient/add', upload.single('pdfFile'), async (req, res) => {
    try {
      const { patientName } = req.body;
      const pdfFile = req.file;

      if (!pdfFile) {
        return res.status(400).json({ success: false, message: 'No PDF file uploaded' });
      }

      // Save the file to MongoDB using GridFS
      const gfs = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: 'uploads',
      });

      const writeStream = gfs.openUploadStream(pdfFile.originalname);
      writeStream.write(pdfFile.buffer);
      writeStream.end();

      // Save patient data with the GridFS file ID
      const newPatient = new Patient({
        patientName,
        pdfFileId: writeStream.id, // Store the GridFS file ID in the Patient model
      });

      await newPatient.save();

      return res.status(201).json({ success: true, message: 'Patient data added successfully' });
    } catch (error) {
      console.error('Error during patient data saving:', error.message);
      return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
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

  app.post('/uploadFile', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      const fileInfo = {
        filename: req.file.filename,
        fileId: req.file.id,
        uploadDate: new Date(),
      };

      const fileInfoModel = new FileInfo(fileInfo);
      await fileInfoModel.save();

      return res.status(201).json({ success: true, message: 'File uploaded', fileInfo });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  const port = 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
