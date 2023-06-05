const db = require('../../connection');

/**
 * Retrieves a user by their user ID.
 * @param {number} user_id - The ID of the user.
 * @returns {Promise<Object|null>} A promise that resolves to an object containing user details if found, or null if not found.
 */
const getUserById = (user_id) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'SELECT * FROM users WHERE id = $1;';

  // Prepare the values to be inserted into the query
  const values = [user_id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(data => {
      // Check if a matching user was found
      if (data.rows.length === 1) {
        // Extract the user details from the query response
        const { id, username, email, password, deleted_at } = data.rows[0];
        return { id, username, email, deleted_at };
      } else {
        return null; // User not found
      }
    })
    .catch(error => {
      console.error('Error retrieving user:', error);
      return null; // Error occurred
    });
};

module.exports =
  getUserById;
