// import all functions to do with querying the chapters table
//this file is for exporting all functions to do with retrieving information from the chapters table

//TODO get votes by chapter
const db = require('../../connection');
const users = require('../users/users');

/**
 * Creates a vote for a chapter in the database.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @param {number} chapter_id - The ID of the chapter to vote for.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the vote creation.
 */
const createVote = (email, password, chapter_id) => {
  // Check if the user is authenticated
  return users.authenticate(email, password)
    .then(authenticated => {
      if (!authenticated) {
        throw new Error('Authentication failed');
      }

      // Prepare the SQL query with parameter placeholders
      const query = 'INSERT INTO votes (user_id, chapter_id) VALUES ((SELECT id FROM users WHERE email = $1), $2);';

      // Prepare the values to be inserted into the query
      const values = [email, chapter_id];

      // Execute the query using the database connection
      return db.query(query, values);
    })
    .then(() => {
      return true; // Vote created successfully
    })
    .catch(error => {
      console.error('Error creating vote:', error);
      return false; // Vote creation failed
    });
};

/**
 * Removes a vote for a chapter from the database.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @param {number} chapter_id - The ID of the chapter to remove the vote from.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the vote removal.
 */
const removeVote = (email, password, chapter_id) => {
  // Check if the user is authenticated
  return users.authenticate(email, password)
    .then(authenticated => {
      if (!authenticated) {
        throw new Error('Authentication failed');
      }

      // Prepare the SQL query with parameter placeholders
      const query = 'DELETE FROM votes WHERE user_id = (SELECT id FROM users WHERE email = $1) AND chapter_id = $2;';

      // Prepare the values to be inserted into the query
      const values = [email, chapter_id];

      // Execute the query using the database connection
      return db.query(query, values);
    })
    .then(() => {
      return true; // Vote removed successfully
    })
    .catch(error => {
      console.error('Error removing vote:', error);
      return false; // Vote removal failed
    });
};

module.exports = {
  create: createVote,
  remove: removeVote
};
