const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const mongoURI = 'mongodb+srv://akshaymmaimbilly:akshaymm@cluster0.iyvhtug.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;

conn.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

conn.once('open', () => {
  console.log('Connected to MongoDB');

  const gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');

  const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const fileInfo = {
          filename: Date.now() + '-' + file.originalname,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    },
  });

  const upload = multer({ storage: storage });

  const app = express();
  app.use(cors());

  app.post('/uploadFile', upload.single('file'), (req, res) => {
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