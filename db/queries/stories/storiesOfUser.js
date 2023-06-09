const db = require('../../connection');

/**
 * Retrieves an array of story IDs associated with a given user ID.
 * @param {number} user_id - The ID of the user.
 * @returns {Promise<number[]>} A promise that resolves to an array of story IDs.
 */
const storiesOfUser = (user_id) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'SELECT id FROM stories WHERE first_chapter_id IN (SELECT id FROM chapters WHERE user_id = $1);';

  // Prepare the values to be inserted into the query
  const values = [user_id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(data => {
      // Extract the story IDs from the query response
      const storyIds = data.rows.map(row => row.id);
      return storyIds;
    })
    .catch(error => {
      console.error('Error retrieving story IDs:', error);
      return []; // Return an empty array if an error occurs
    });
};

module.exports = storiesOfUser;
