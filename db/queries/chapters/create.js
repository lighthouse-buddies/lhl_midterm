const db = require('../../connection');

/**
 * Creates a new chapter in the database.
 * @param {string} content - The content of the chapter.
 * @param {number|null} prev - The ID of the previous chapter (if any).
 * @param {number} user_id - The ID of the user creating the chapter.
 * @returns {Promise<number|null>} A promise that resolves to the chapter ID (as a number) if the chapter is created successfully, or null if the chapter creation fails.
 */
const createChapter = (content, prev, user_id) => {
  // Prepare the SQL query with parameter placeholders
  let query;
  let values;

  if (prev === null) {
    query = `
      INSERT INTO chapters (content, user_id, created_at)
      VALUES ($1, $2, CURRENT_TIMESTAMP)
      RETURNING id, content, user_id, created_at, prev;
    `;
    values = [content, user_id];
  } else {
    query = `
      INSERT INTO chapters (content, user_id, created_at, prev)
      VALUES ($1, $2, CURRENT_TIMESTAMP, $3)
      RETURNING id, content, user_id, created_at, prev;
    `;
    values = [content, user_id, prev];
  }

  // Execute the query using the database connection
  return db.query(query, values)
    .then(data => {
      // Check if a chapter ID is returned
      if (data.rows.length === 1) {
        // Extract the chapter ID from the query response
        return data.rows[0];
      } else {
        return null; // Chapter creation failed
      }
    })
    .catch(error => {
      console.error('Error creating chapter:', error);
      return null; // Chapter creation failed
    });
};

module.exports = createChapter;
