const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const multer = require('multer');
const { testConnection } = require('./config/database');
const { initializeDatabase } = require('./config/init-db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'lost-and-found-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Serve static files from the views directory
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Auth page routes
app.get('/auth/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'auth', 'login.html'));
});

app.get('/auth/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'auth', 'register.html'));
});

// Report page routes
app.get('/reports/new', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reports', 'new.html'));
});

app.get('/reports/view', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reports', 'view.html'));
});

app.get('/reports/lost', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reports', 'lost.html'));
});

app.get('/reports/found', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reports', 'found.html'));
});

app.get('/reports/my-reports', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reports', 'my-reports.html'));
});

// Import routes
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');
const adminRoutes = require('./routes/admin');

// Use routes
app.use('/auth', authRoutes);
app.use('/reports', reportRoutes);
app.use('/admin', adminRoutes);

app.get('/admin/report', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'reports.html'));
})
;
// Admin page routes (these must come after the API routes)
app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'login.html'));
});

app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'dashboard.html'));
});

app.get('/admin/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'users.html'));
});






// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Initialize database and start server
initializeDatabase()
  .then(() => {
    // Test database connection
    return testConnection();
  })
  .then(connected => {
    if (!connected) {
      console.error('Failed to connect to database. Server will start, but functionality may be limited.');
    }

    // Start server
    app.listen(PORT, '0.0.0.0',() => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error during initialization:', error);
    process.exit(1);
  });

module.exports = app;
