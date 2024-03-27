const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const bcrypt = require('bcrypt');
const multer = require("multer");
const path = require("path");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const SerialPort = require("serialport").SerialPort;

const server = http.createServer(app);
const io = new Server(server);

// Replace 1st parameter 'COM3' with the appropriate serial port path for your Arduino on Ubuntu
// You can find the serial port path by running the command: dmesg | grep tty
// const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 });
// var SerialPort = require('serialport');
var port = new SerialPort("COM3", {
  baudRate: 9600,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI =
  "mongodb+srv://akshaymmaimbilly:akshaymm@cluster0.iyvhtug.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

connection.once("open", async () => {
  console.log("Connected to MongoDB");

  // Define Patient Schema
  const patientSchema = new mongoose.Schema({
    personalDetails: {
      id: String,
      name: String,
      gender: String,
      dob: Date,
      age: Number,
      place: String,
    },
    contactDetails: {
      phoneNumber: String,
      bystanderPhoneNumber: String,
      email: String,
    },
    medicalRecords: {
      allergies: String,
      treatments: String,
      medicalAlerts: String,
      principleDoctor: String,
      hospital: String,
      reasonForAdmission: String,
      principleDiagnosis: String,
      otherDiagnosis: String,
      operationProcedure: String,
      description: String,
      medicines: String,
      patientHistory: String,
    },
  });

  const Patient = mongoose.model("Patient", patientSchema);

  // Define User Schema
  const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  const User = mongoose.model("User", userSchema);

  // Define Image Schema
  const imageSchema = new mongoose.Schema({
    filename: String,
    path: String,
  });

  const Image = mongoose.model("Image", imageSchema);

  // Multer storage configuration
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "."); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({ storage: storage });

  // Upload Image Endpoint
  app.post("/upload", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const image = new Image({
        filename: req.file.filename,
        path: req.file.path,
      });

      await image.save();
      res.json({ message: "Image uploaded successfully" });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get All Images Endpoint
  app.get("/images", async (req, res) => {
    try {
      const images = await Image.find();
      res.json(images);
    } catch (error) {
      console.error("Error retrieving images:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // User Registration Endpoint
  app.post("/api/user/register", async (req, res) => {
    const { username, password } = req.body;

    try {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.json({ success: false, message: "Username already exists" });
      }

      // const hashedPassword = await bcrypt.hash(password, 10);

      // const newUser = new User({ username, password: hashedPassword });
      // await newUser.save();

      res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
      console.error("Error during user registration:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });

  // User Login Endpoint
  app.post("/api/user/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      // const passwordMatch = await bcrypt.compare(password, user.password);
      // if (passwordMatch) {
      //   res.json({ success: true, message: 'Login successful' });
      // } else {
      //   res.json({ success: false, message: 'Invalid credentials' });
      // }
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  });

  app.post("/api/patient", async (req, res) => {
    const { personalDetails, contactDetails, medicalRecords } = req.body;
    try {
      const patient = await Patient.create({
        personalDetails,
        contactDetails,
        medicalRecords,
      });
      res.status(201).json(patient);
    } catch (error) {
      console.error("Error creating new patient:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Routes
  app.get("/api/patient", async (req, res) => {
    try {
      const patient = await Patient.findOne();
      res.json(patient);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching patient data." });
    }
  });

  app.post("/api/patient/update", async (req, res) => {
    const updatedData = req.body;

    try {
      await Patient.updateOne({}, updatedData);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating patient data:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating patient data." });
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
