// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/societyDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Configure Express to serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const requestSchema = new mongoose.Schema({
  residentName: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  image: { type: String, required: true }
});

const Request = mongoose.model('Request', requestSchema);

// Create a new request
app.post('/requests', upload.single('image'), async (req, res) => {
    try {
      const { residentName, content } = req.body;
      const imagePath = req.file.path;
      const newRequest = new Request({ 
        residentName, 
        content, 
        image: imagePath
      });
      const savedRequest = await newRequest.save();
      res.json(savedRequest);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get all requests
  app.get('/requests', async (req, res) => {
    try {
      const requests = await Request.find();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Like a request
  app.patch('/requests/:id/like', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedRequest = await Request.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
      res.json(updatedRequest);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete a request
  app.delete('/requests/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Request.findByIdAndDelete(id);
      res.json({ message: 'Request deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
