const db = require('../../connection');
const users = require('../users/users');

/**
 * Removes a story from the database.
 * @param {number} id - The ID of the story to remove.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the story removal.
 */
const removeStory = (id, email, password) => {
  // Check if the user is authenticated
  return users.authenticate(email, password)
    .then(authenticated => {
      if (!authenticated) {
        throw new Error('Authentication failed');
      }

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
    })
    .catch(error => {
      console.error('Authentication failed:', error);
      return false; // Story removal failed due to authentication failure
    });
};

module.exports = removeStory;
