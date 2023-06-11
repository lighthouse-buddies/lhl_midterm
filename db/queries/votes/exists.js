const db = require('../../connection');

/**
 * Checks if a vote exists for the given userId and chapterId.
 *
 * @param {number} userId - The ID of the user.
 * @param {number} chapterId - The ID of the chapter.
 * @returns {Promise<boolean>} - A promise that resolves to true if a vote exists, false otherwise.
 */
const exists = (userId, chapterId) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'SELECT EXISTS (SELECT 1 FROM votes WHERE user_id = $1 AND chapter_id = $2);';

  // Prepare the values to be inserted into the query
  const values = [userId, chapterId];

  // Execute the query using the database connection
  return db.query(query, values)
    .then((result) => {
      return result.rows[0].exists;
    })
    .catch((error) => {
      console.error('Error checking if vote exists:', error);
      throw error;
    });
};

module.exports = exists;
