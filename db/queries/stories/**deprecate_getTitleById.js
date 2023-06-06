const db = require('../../connection');

/**
 * Retrieves the title of a story by its ID.
 * @param {number} id - The ID of the story.
 * @returns {Promise<string|null>} A promise that resolves to the title (as a string) if found, or null if not found.
 */
const deprecate_getTitleById = (id) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'SELECT title FROM stories WHERE id = $1;';

  // Prepare the values to be inserted into the query
  const values = [id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(data => {
      // Check if a title was found
      if (data.rows.length === 1) {
        // Extract the title from the query response
        const title = data.rows[0].title;
        return title;
      } else {
        return null; // Title not found
      }
    })
    .catch(error => {
      console.error('Error retrieving title:', error);
      return null; // Error occurred
    });
};

module.exports = deprecate_getTitleById;
