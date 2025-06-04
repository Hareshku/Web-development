const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Report = require('../models/Report');
const { isAuthenticated } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error('Only image files are allowed'));
  }
});

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.getAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reports by type (lost or found)
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;

    if (type !== 'lost' && type !== 'found') {
      return res.status(400).json({ message: 'Type must be either "lost" or "found"' });
    }

    const reports = await Report.getByType(type);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reports by current user
router.get('/user', isAuthenticated, async (req, res) => {
  try {
    // Get user ID from session or JWT token
    const userId = req.session.userId || (req.user && req.user.id);

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in session or token' });
    }

    const reports = await Report.getByUserId(userId);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific report
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new report
router.post('/', isAuthenticated, upload.single('image'), async (req, res) => {
  try {
    const { type, itemName, description, category, location, date } = req.body;

    // Validate input
    if (!type || !itemName || !description || !category || !location || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (type !== 'lost' && type !== 'found') {
      return res.status(400).json({ message: 'Type must be either "lost" or "found"' });
    }

    // Get image URL if uploaded
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Get user ID from session or JWT token
    const userId = req.session.userId || (req.user && req.user.id);

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in session or token' });
    }

    // Create report
    const report = await Report.create({
      type,
      itemName,
      description,
      category,
      location,
      date,
      imageUrl,
      userId: userId
    });

    // Find potential matches
    const matches = await Report.findMatches(report);

    res.status(201).json({ report, matches });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a report
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Get user ID from session or JWT token
    const userId = req.session.userId || (req.user && req.user.id);

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in session or token' });
    }

    // Check if user owns the report
    if (report.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this report' });
    }

    // Update report
    const updatedReport = await Report.update(id, req.body);

    res.json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a report
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Get user ID from session or JWT token
    const userId = req.session.userId || (req.user && req.user.id);

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in session or token' });
    }

    // Check if user owns the report
    if (report.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this report' });
    }

    // Delete image if exists
    if (report.imageUrl) {
      const imagePath = path.join(__dirname, '../public', report.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete report
    await Report.delete(id);

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get matches for a report
router.get('/:id/matches', async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Find matches
    const matches = await Report.findMatches(report);

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark a report as resolved (user)
router.put('/:id/resolve', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Get user ID from session or JWT token
    const userId = req.session.userId || (req.user && req.user.id);

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in session or token' });
    }

    // Check if user owns the report
    if (report.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to resolve this report' });
    }

    // Update report status to resolved
    const updatedReport = await Report.update(id, { status: 'resolved' });

    res.json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
