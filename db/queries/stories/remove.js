const db = require('../../connection');

/**
 * Removes a story from the database.
 * @param {number} id - The ID of the story to remove.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the story removal.
 */
const remove = (id) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'DELETE FROM stories WHERE id = $1;';

  // Prepare the values to be inserted into the query
  const values = [id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(() => {
      return true; // Story removed successfully
    })
    .catch(error => {
      console.error('Error removing story:', error);
      return false; // Story removal failed
    });
};

module.exports = remove;
