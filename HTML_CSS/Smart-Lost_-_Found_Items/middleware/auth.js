const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
  // Check if user is authenticated via session
  if (req.session && req.session.userId) {
    // Verify that the user exists in the database
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        return next();
      }
    } catch (error) {
      console.error('Error verifying user session:', error);
    }
  }

  // Check if user is authenticated via JWT
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Verify that the user exists in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Set the user ID in the session for consistency
    req.session.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  // First check if admin is authenticated via session
  if (req.session && req.session.isAdmin === true) {
    return next();
  }

  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  // Check Basic Authentication header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // If it's an AJAX request or API endpoint
    if (req.xhr || req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(401).json({ message: 'Admin authentication required' });
    }

    // If it's a page request, redirect to admin login
    return res.redirect('/admin/login');
  }

  // Decode Basic Authentication
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
  const [providedUsername, providedPassword] = credentials.split(':');

  if (providedUsername === username && providedPassword === password) {
    // Set admin session
    req.session.isAdmin = true;
    return next();
  }

  // If API request, return 403
  if (req.xhr || req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.status(403).json({ message: 'Admin access denied' });
  }

  // If page request, redirect to login
  return res.redirect('/admin/login');
};

module.exports = {
  isAuthenticated,
  isAdmin
};
