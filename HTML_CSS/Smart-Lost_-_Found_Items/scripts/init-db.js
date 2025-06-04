const { initializeDatabase } = require('../config/init-db');

// Run the database initialization
initializeDatabase()
  .then(() => {
    console.log('Database initialization completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error initializing database:', error);
    process.exit(1);
  });
