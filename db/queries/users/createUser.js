const db = require('../../connection');

/**
 * Creates a new user in the database.
 * @param {string} username - The username of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<number|null>} A promise that resolves to the user ID (as a number) if the user is created successfully, or null if the user creation fails.
 */
const createUser = (username, email, password) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;';

  // Prepare the values to be inserted into the query
  const values = [username, email, password];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(data => {
      // Check if a user ID is returned
      if (data.rows.length === 1) {
        // Extract the user ID from the query response
        const userId = data.rows[0].id;
        return userId;
      } else {
        return null; // User creation failed
      }
    })
    .catch(error => {
      console.error('Error creating user:', error);
      return null; // User creation failed
    });
};

module.exports = createUser;
