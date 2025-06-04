const { pool } = require('../config/database');
const { findPotentialMatches } = require('../utils/matching');

// Helper function to format dates for MySQL
function formatDateForMySQL(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

// Helper function to format dates for client (ISO format)
function formatDateForClient(mysqlDate) {
  // If it's already in MySQL format (YYYY-MM-DD HH:MM:SS), convert to ISO
  if (typeof mysqlDate === 'string' && mysqlDate.includes(' ')) {
    return mysqlDate.replace(' ', 'T') + 'Z';
  }
  // If it's a Date object, convert to ISO
  if (mysqlDate instanceof Date) {
    return mysqlDate.toISOString();
  }
  // Otherwise return as is
  return mysqlDate;
}

class Report {
  constructor(id, type, itemName, description, category, location, date, imageUrl, userId, status = 'active') {
    this.id = id;
    this.type = type; // 'lost' or 'found'
    this.itemName = itemName;
    this.description = description;
    this.category = category;
    this.location = location;
    this.date = date;
    this.imageUrl = imageUrl;
    this.userId = userId;
    this.status = status; // 'active', 'resolved', 'flagged'
    const now = new Date();
    this.createdAt = formatDateForMySQL(now);
  }

  // Get all reports
  static async getAll() {
    try {
      const [rows] = await pool.query(`
        SELECT
          id,
          type,
          item_name as itemName,
          description,
          category,
          location,
          date,
          image_url as imageUrl,
          user_id as userId,
          status,
          created_at as createdAt
        FROM reports
      `);
      return rows;
    } catch (error) {
      console.error('Error fetching reports:', error);
      return [];
    }
  }

  // Find report by ID
  static async findById(id) {
    try {
      const [rows] = await pool.query(`
        SELECT
          id,
          type,
          item_name as itemName,
          description,
          category,
          location,
          date,
          image_url as imageUrl,
          user_id as userId,
          status,
          created_at as createdAt
        FROM reports
        WHERE id = ?
      `, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding report by ID:', error);
      return null;
    }
  }

  // Get reports by type (lost or found)
  static async getByType(type) {
    try {
      const [rows] = await pool.query(`
        SELECT
          id,
          type,
          item_name as itemName,
          description,
          category,
          location,
          date,
          image_url as imageUrl,
          user_id as userId,
          status,
          created_at as createdAt
        FROM reports
        WHERE type = ? AND status = 'active'
      `, [type]);
      return rows;
    } catch (error) {
      console.error('Error fetching reports by type:', error);
      return [];
    }
  }

  // Get reports by user ID
  static async getByUserId(userId) {
    try {
      const [rows] = await pool.query(`
        SELECT
          id,
          type,
          item_name as itemName,
          description,
          category,
          location,
          date,
          image_url as imageUrl,
          user_id as userId,
          status,
          created_at as createdAt
        FROM reports
        WHERE user_id = ?
      `, [userId]);
      return rows;
    } catch (error) {
      console.error('Error fetching reports by user ID:', error);
      return [];
    }
  }

  // Create a new report
  static async create(reportData) {
    try {
      // Generate a new ID
      const id = Date.now().toString();
      const now = new Date();
      // Format date for MySQL (YYYY-MM-DD HH:MM:SS)
      const createdAt = formatDateForMySQL(now);

      // Insert into database
      await pool.query(
        `INSERT INTO reports (
          id,
          type,
          item_name,
          description,
          category,
          location,
          date,
          image_url,
          user_id,
          status,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          reportData.type,
          reportData.itemName,
          reportData.description,
          reportData.category,
          reportData.location,
          reportData.date,
          reportData.imageUrl || null,
          reportData.userId,
          'active',
          createdAt
        ]
      );

      // Return the new report
      return {
        id,
        type: reportData.type,
        itemName: reportData.itemName,
        description: reportData.description,
        category: reportData.category,
        location: reportData.location,
        date: reportData.date,
        imageUrl: reportData.imageUrl || null,
        userId: reportData.userId,
        status: 'active',
        createdAt: formatDateForClient(createdAt) // Convert back to ISO format for client
      };
    } catch (error) {
      console.error('Error creating report:', error);
      throw error;
    }
  }

  // Update a report
  static async update(id, updateData) {
    try {
      // Check if report exists
      const report = await this.findById(id);

      if (!report) {
        throw new Error('Report not found');
      }

      // Build update query
      const updateFields = [];
      const updateValues = [];

      if (updateData.type) {
        updateFields.push('type = ?');
        updateValues.push(updateData.type);
      }

      if (updateData.itemName) {
        updateFields.push('item_name = ?');
        updateValues.push(updateData.itemName);
      }

      if (updateData.description) {
        updateFields.push('description = ?');
        updateValues.push(updateData.description);
      }

      if (updateData.category) {
        updateFields.push('category = ?');
        updateValues.push(updateData.category);
      }

      if (updateData.location) {
        updateFields.push('location = ?');
        updateValues.push(updateData.location);
      }

      if (updateData.date) {
        updateFields.push('date = ?');
        updateValues.push(updateData.date);
      }

      if (updateData.imageUrl !== undefined) {
        updateFields.push('image_url = ?');
        updateValues.push(updateData.imageUrl);
      }

      if (updateData.status) {
        updateFields.push('status = ?');
        updateValues.push(updateData.status);
      }

      // Add ID to values array
      updateValues.push(id);

      // Execute update query
      if (updateFields.length > 0) {
        await pool.query(
          `UPDATE reports SET ${updateFields.join(', ')} WHERE id = ?`,
          updateValues
        );
      }

      // Return updated report
      return await this.findById(id);
    } catch (error) {
      console.error('Error updating report:', error);
      throw error;
    }
  }

  // Delete a report
  static async delete(id) {
    try {
      // Check if report exists
      const report = await this.findById(id);

      if (!report) {
        throw new Error('Report not found');
      }

      // Delete from database
      await pool.query('DELETE FROM reports WHERE id = ?', [id]);

      return true;
    } catch (error) {
      console.error('Error deleting report:', error);
      throw error;
    }
  }

  // Find potential matches for a report
  static async findMatches(report) {
    try {
      const oppositeType = report.type === 'lost' ? 'found' : 'lost';

      // Get potential matches from database
      const [potentialMatches] = await pool.query(`
        SELECT
          id,
          type,
          item_name as itemName,
          description,
          category,
          location,
          date,
          image_url as imageUrl,
          user_id as userId,
          status,
          created_at as createdAt
        FROM reports
        WHERE type = ? AND status = 'active' AND id != ?
      `, [oppositeType, report.id]);

      // Use the improved matching function from utils/matching.js
      // Set minimum match percentage to 50%
      return findPotentialMatches(report, potentialMatches, 50);
    } catch (error) {
      console.error('Error finding matches:', error);
      return [];
    }
  }
}

module.exports = Report;
