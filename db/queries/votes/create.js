const db = require('../../connection');

/**
 * Creates a vote for a chapter in the database.
 * @param {number} user_id - The ID of the user.
 * @param {number} chapter_id - The ID of the chapter to vote for.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the vote creation.
 */
const createVote = (user_id, chapter_id) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'INSERT INTO votes (user_id, chapter_id) VALUES ($1, $2);';

  // Prepare the values to be inserted into the query
  const values = [user_id, chapter_id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(() => {
      return true; // Vote created successfully
    })
    .catch(error => {
      console.error('Error creating vote:', error);
      return false; // Vote creation failed
    });
};

module.exports = createVote;
