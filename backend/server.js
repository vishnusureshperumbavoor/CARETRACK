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

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;

conn.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

conn.once('open', () => {
  console.log('Connected to MongoDB');

  // GridFS setup
  const gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');

  const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const fileInfo = {
          filename: Date.now() + '-' + file.originalname,
        };
        resolve(fileInfo);
      });
    },
  });

  const upload = multer({ storage: storage });

  // User Model
  const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  const User = mongoose.model('User', userSchema);

  // Admin Model
  const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  const Admin = mongoose.model('Admin', adminSchema);

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
  app.post('/uploadFile', upload.single('<your_file_field_name>'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json("No file uploaded");
      }
      return res.status(201).json("File uploaded");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal Server Error");
    }
  });

  const port = 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
