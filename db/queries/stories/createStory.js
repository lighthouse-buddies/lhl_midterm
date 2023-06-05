const db = require('../../connection');
const users = require('../users/users');

/**
 * Creates a story with the first chapter in the database.
 * @param {string} title - The title of the story.
 * @param {number} chapter_id - The ID of the first chapter.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the story creation.
 */
const createStory = (title, chapter_id, email, password) => {
  // Check if the user is authenticated
  return users.authenticate(email, password)
    .then(authenticated => {
      if (!authenticated) {
        throw new Error('Authentication failed');
      }

      // Prepare the SQL query with parameter placeholders
      const query = 'INSERT INTO stories (title, first_chapter_id) VALUES ($1, $2);';

      // Prepare the values to be inserted into the query
      const values = [title, chapter_id];

      // Execute the query using the database connection
      return db.query(query, values)
        .then(() => {
          return true; // Story and first chapter created successfully
        })
        .catch(error => {
          console.error('Error creating story:', error);
          return false; // Story creation failed
        });
    })
    .catch(error => {
      console.error('Authentication failed:', error);
      return false; // Story creation failed due to authentication failure
    });
};

module.exports = createStory;
