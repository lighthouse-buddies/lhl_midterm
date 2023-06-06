const db = require('../../connection');

/**
 * Retrieves the total count of votes for a given chapter ID.
 *
 * @param {number} chapterId - The ID of the chapter.
 * @returns {Promise<number>} - A promise that resolves to the total count of votes for the specified chapter.
 */
const getChapterCount = (chapterId) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'SELECT COUNT(*) FROM votes WHERE chapter_id = $1;';

  // Prepare the values to be inserted into the query
  const values = [chapterId];

  // Execute the query using the database connection
  return db.query(query, values)
    .then((result) => {
      return result.rows[0].count;
    })
    .catch((error) => {
      console.error('Error retrieving vote count:', error);
      throw error;
    });
};

module.exports = getChapterCount;
