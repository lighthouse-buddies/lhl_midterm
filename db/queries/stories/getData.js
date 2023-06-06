const db = require('../../connection');

/**
 * Retrieves a row by its ID from the stories table in the database.
 * @param {number} id - The ID of the row.
 * @returns {Promise<Object|null>} A promise that resolves to the row object if found, or null if not found.
 */
const getData = (id) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'SELECT * FROM stories WHERE id = $1;';

  // Prepare the values to be inserted into the query
  const values = [id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(data => {
      // Check if a row was found
      if (data.rows.length === 1) {
        // Extract the row from the query response
        const row = data.rows[0];
        return row;
      } else {
        return null; // Row not found
      }
    })
    .catch(error => {
      console.error('Error retrieving data from stories:', error);
      return null; // Error occurred during data retrieval
    });
};

module.exports = getData;
