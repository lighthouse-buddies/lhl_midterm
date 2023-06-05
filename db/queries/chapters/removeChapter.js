const db = require('../../connection');
const users = require('../users/users');

/**
 * Removes a chapter from the database by its ID.
 * @param {number} id - The ID of the chapter to be removed.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the operation.
 */
const removeChapter = (id, email, password) => {
  // Check if the user is authenticated
  return users.authenticate(email, password)
    .then(authenticated => {
      if (!authenticated) {
        throw new Error('Authentication failed');
      }

      // Prepare the SQL query with parameter placeholders
      const query = 'DELETE FROM chapters WHERE id = $1;';

      // Prepare the values to be inserted into the query
      const values = [id];

      // Execute the query using the database connection
      return db.query(query, values)
        .then(() => {
          return true; // Chapter removed successfully
        })
        .catch(error => {
          console.error('Error removing chapter:', error);
          return false; // Chapter removal failed
        });
    })
    .catch(error => {
      console.error('Authentication failed:', error);
      return false; // Chapter removal failed due to authentication failure
    });
};

module.exports = removeChapter;
