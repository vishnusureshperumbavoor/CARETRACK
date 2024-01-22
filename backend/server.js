const express = require('express');
const multer = require('multer');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb+srv://akshaymmaimbilly:akshaymm@cluster0.iyvhtug.mongodb.net/?retryWrites=true&w=majority'; // replace with your MongoDB connection string
const dbName = 'caretrack'; // replace with your database name

let db;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
 if (err) return console.log(err);
 db = client.db(dbName);
});

app.get('/api/patient', (req, res) => {
 db.collection('patients') // replace with your collection name
  .findOne() // adjust this according to your query
  .then(patient => {
    res.send(patient);
  })
  .catch(err => console.error(err));
});





var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dirName = path.join(process.cwd(), './files/');
    if (!fs.existsSync(dirName)){
      fs.mkdirSync(dirName);
    }
    cb(null, dirName);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
 });
 
 var upload = multer({ storage: storage });
 
 router.post("/api/user-profile", upload.single('file'), (req, res) => {
  console.log(req.file.destination); // image url
  console.log(JSON.parse(req.body)); // other things
 });

app.listen(5000, () => console.log('Server started on port 5000'));
