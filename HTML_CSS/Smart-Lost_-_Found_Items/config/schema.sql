-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS lost_and_found;

-- Use the database
USE lost_and_found;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id VARCHAR(36) PRIMARY KEY,
  type ENUM('lost', 'found') NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  location VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  image_url VARCHAR(255),
  user_id VARCHAR(36),
  status ENUM('active', 'resolved', 'flagged') DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes
-- CREATE INDEX idx_reports_type ON reports(type);
-- CREATE INDEX idx_reports_status ON reports(status);
-- CREATE INDEX idx_reports_user_id ON reports(user_id);
