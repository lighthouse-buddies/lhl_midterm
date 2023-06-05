const db = require('../../connection');
const users = require('../users/users'); // Import the users module with the authenticate function

/**
 * Creates a new chapter in the database.
 * @param {string} content - The content of the chapter.
 * @param {number|null} prev - The ID of the previous chapter (if any).
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<number|null>} A promise that resolves to the chapter ID (as a number) if the chapter is created successfully, or null if the chapter creation fails.
 */
const createChapter = (content, prev, email, password) => {
  // Check if the user is authenticated
  return users.authenticate(email, password)
    .then(authenticated => {
      if (!authenticated) {
        throw new Error('Authentication failed');
      }

      // Prepare the SQL query with parameter placeholders
      const query = `
        INSERT INTO chapters (content, prev, user_id, created_at)
        VALUES ($1, $2, (SELECT id FROM users WHERE email = $3), CURRENT_TIMESTAMP)
        RETURNING id;
      `;

      // Prepare the values to be inserted into the query
      const values = [content, prev, email];

      // Execute the query using the database connection
      return db.query(query, values)
        .then(data => {
          // Check if a chapter ID is returned
          if (data.rows.length === 1) {
            // Extract the chapter ID from the query response
            const chapterId = data.rows[0].id;
            return chapterId;
          } else {
            return null; // Chapter creation failed
          }
        })
        .catch(error => {
          console.error('Error creating chapter:', error);
          return null; // Chapter creation failed
        });
    })
    .catch(error => {
      console.error('Authentication failed:', error);
      return null; // Chapter creation failed due to authentication failure
    });
};

module.exports = createChapter;
