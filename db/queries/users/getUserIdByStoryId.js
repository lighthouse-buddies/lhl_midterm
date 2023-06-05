const db = require('../../connection');

/**
 * Retrieves the user ID associated with a given story ID.
 * @param {number} story_id - The ID of the story.
 * @returns {Promise<number|null>} A promise that resolves to the user ID (as a number) if found, or null if not found.
 */
const getUserIdByStoryId = (story_id) => {
  // Prepare the SQL query with parameter placeholders
  const query = `
    SELECT user_id
    FROM chapters
    WHERE id = (SELECT first_chapter_id FROM stories WHERE id = $1);
  `;

  // Prepare the values to be inserted into the query
  const values = [story_id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(data => {
      // Check if a matching user ID was found
      if (data.rows.length === 1) {
        // Extract the user ID from the query response
        const user_id = data.rows[0].user_id;
        return user_id;
      } else {
        return null; // Story not found or user ID not found
      }
    })
    .catch(error => {
      console.error('Error retrieving user ID by story ID:', error);
      return null; // Error occurred
    });
};

module.exports =
  getUserIdByStoryId;
