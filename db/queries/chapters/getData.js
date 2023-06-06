const db = require('../../connection');

/**
 * Retrieves a chapter by its ID.
 * @param {number} id - The ID of the chapter.
 * @returns {Promise<Object|null>} A promise that resolves to an object containing the chapter details if found, or null if not found.
 */
const getData = (id) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'SELECT * FROM chapters WHERE id = $1;';

  // Prepare the values to be inserted into the query
  const values = [id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(data => {
      // Check if a matching chapter was found
      if (data.rows.length === 1) {
        // Extract the chapter details from the query response
        return data.rows[0];
      } else {
        return null; // Chapter not found
      }
    })
    .catch(error => {
      console.error('Error retrieving chapter:', error);
      return null; // Error occurred
    });
};

module.exports = getData;
