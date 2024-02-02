const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('./file-upload');
const authRoutes = require('./auth');
const rfid =require('./rfid')

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));
app.use('/api/user', authRoutes);
app.use('/', fileUpload);
app.use('/check-rfid', rfid);

const port = 4000;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
