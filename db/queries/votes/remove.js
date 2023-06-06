const db = require('../../connection');

/**
 * Removes a vote for a chapter from the database.
 * @param {number} user_id - The ID of the user.
 * @param {number} chapter_id - The ID of the chapter to remove the vote from.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the vote removal.
 */
const removeVote = (user_id, chapter_id) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'DELETE FROM votes WHERE user_id = $1 AND chapter_id = $2;';

  // Prepare the values to be inserted into the query
  const values = [user_id, chapter_id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(() => {
      return true; // Vote removed successfully
    })
    .catch(error => {
      console.error('Error removing vote:', error);
      return false; // Vote removal failed
    });
};

module.exports = removeVote;
