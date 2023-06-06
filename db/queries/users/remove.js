const db = require('../../connection');

/**
 * Soft deletes a chapter from the database by setting the "deleted_at" field.
 * @param {number} id - The ID of the chapter to be soft deleted.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the operation.
 */
const remove = (id) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'UPDATE chapters SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1;';

  // Prepare the values to be inserted into the query
  const values = [id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(() => {
      return true; // Chapter soft deleted successfully
    })
    .catch(error => {
      console.error('Error soft deleting chapter:', error);
      return false; // Chapter deletion failed
    });
};

module.exports = remove;
