const db = require('../../connection');

/**
 * Authenticates a user based on their email and password.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<number|null>} A promise that resolves to the user ID (as a number) if authentication is successful, or null if authentication fails.
 */
const authenticate = (email, password) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'SELECT id FROM users WHERE email = $1 AND password = $2;';

  // Prepare the values to be inserted into the query
  const values = [email, password];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(data => {
      // Check if a matching user was found
      if (data.rows.length === 1) {
        // Extract the user ID from the query response
        const userId = data.rows[0].id;
        return userId;
      } else {
        return null; // Authentication failed (user not found)
      }
    })
    .catch(error => {
      console.error('Error authenticating user:', error);
      return null; // Authentication failed
    });
};

module.exports = authenticate;
