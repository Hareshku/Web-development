const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // Get all users
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      return null;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  }

  // Find user by username
  static async findByUsername(username) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding user by username:', error);
      return null;
    }
  }

  // Create a new user
  static async create(userData) {
    try {
      // Check if email or username already exists
      const emailExists = await this.findByEmail(userData.email);
      if (emailExists) {
        throw new Error('Email already in use');
      }

      const usernameExists = await this.findByUsername(userData.username);
      if (usernameExists) {
        throw new Error('Username already in use');
      }

      // Generate a new ID
      const id = Date.now().toString();

      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Insert user into database
      await pool.query(
        'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
        [id, userData.username, userData.email, hashedPassword]
      );

      // Return the new user (without password)
      return {
        id,
        username: userData.username,
        email: userData.email
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Validate user credentials
  static async validate(email, password) {
    try {
      const user = await this.findByEmail(email);

      if (!user) {
        return null;
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return null;
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }
}

module.exports = User;
