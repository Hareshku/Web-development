const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Report = require('../models/Report');
const User = require('../models/User');
const { isAdmin } = require('../middleware/auth');

// Admin authentication
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Debug information
  console.log('Admin login attempt:');
  console.log('Provided username:', username);
  console.log('Provided password:', password);
  console.log('Expected username:', process.env.ADMIN_USERNAME || 'admin');
  console.log('Expected password:', process.env.ADMIN_PASSWORD || 'admin123');

  if (username === (process.env.ADMIN_USERNAME || 'admin') && password === (process.env.ADMIN_PASSWORD || 'admin123')) {
    // Set admin session
    req.session.isAdmin = true;
    console.log('Admin login successful');

    res.json({ message: 'Admin logged in successfully' });
  } else {
    console.log('Admin login failed');
    res.status(401).json({ message: 'Invalid admin credentials' });
  }
});

// Get all reports (admin only)
router.get('/reports', isAdmin, async (req, res) => {
  try {
    const reports = await Report.getAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Flag a report (admin only)
router.put('/reports/:id/flag', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Update report status to flagged
    const updatedReport = await Report.update(id, { status: 'flagged' });

    res.json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Resolve a report (admin only)
router.put('/reports/:id/resolve', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Update report status to resolved
    const updatedReport = await Report.update(id, { status: 'resolved' });

    res.json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a report (admin only)
router.delete('/reports/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
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

// Get all users (admin only)
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.getAll();

    // Remove passwords from response
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get dashboard stats (admin only)
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const reports = await Report.getAll();
    const users = await User.getAll();

    const stats = {
      totalReports: reports.length,
      lostReports: reports.filter(report => report.type === 'lost').length,
      foundReports: reports.filter(report => report.type === 'found').length,
      flaggedReports: reports.filter(report => report.status === 'flagged').length,
      resolvedReports: reports.filter(report => report.status === 'resolved').length,
      totalUsers: users.length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
