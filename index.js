const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use('/', express.static(process.cwd() + '/public'));

// Multer configuration for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for serving the HTML form
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Route for handling file uploads and returning metadata
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Extracting file metadata
  const { originalname, mimetype, size } = req.file;

  // Sending JSON response with file metadata
  res.json({ name: originalname, type: mimetype, size: size });
});

// Start the server
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
