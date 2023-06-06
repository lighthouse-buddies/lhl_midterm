const db = require('../../connection');

/**
 * Retrieves the next chapter IDs for a given chapter ID.
 * @param {number} chapter_id - The ID of the current chapter.
 * @returns {Promise<Array<number>>} A promise that resolves to an array of next chapter IDs if found, or an empty array if not found.
 */
const nextChapters = (chapter_id) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'SELECT id FROM chapters WHERE prev = $1;';

  // Prepare the values to be inserted into the query
  const values = [chapter_id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(data => {
      // console.log(data.rows);
      // Extract the next chapter IDs from the query response
      return data.rows.map(row => row.id);
    })
    .catch(error => {
      console.error('Error retrieving next chapters:', error);
      return [];
    });
};

module.exports = nextChapters;
