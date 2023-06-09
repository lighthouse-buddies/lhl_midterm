const db = require('../../connection');

/**
 * Creates a story with the first chapter in the database.
 * @param {string} title - The title of the story.
 * @param {number} chapter_id - The ID of the first chapter.
 * @returns {Promise<number|null>} A promise that resolves to the ID of the created story, or null if creation fails.
 */
const create = (title, chapter_id) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'INSERT INTO stories (title, first_chapter_id, last_chapter_id) VALUES ($1, $2, $3) RETURNING id;';

  // Prepare the values to be inserted into the query
  const values = [title, chapter_id, chapter_id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(result => {
      if (result.rowCount > 0) {
        const storyId = result.rows[0].id;
        return storyId; // Return the ID of the created story
      } else {
        return null; // Story creation failed, return null
      }
    })
    .catch(error => {
      console.error('Error creating story:', error);
      return null; // Story creation failed, return null
    });
};

module.exports = create;
