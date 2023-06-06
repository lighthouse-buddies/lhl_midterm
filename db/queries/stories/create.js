const db = require('../../connection');

/**
 * Creates a story with the first chapter in the database.
 * @param {string} title - The title of the story.
 * @param {number} chapter_id - The ID of the first chapter.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the story creation.
 */
const create = (title, chapter_id) => {
  // Prepare the SQL query with parameter placeholders
  const query = 'INSERT INTO stories (title, first_chapter_id, last_chapter_id) VALUES ($1, $2, $3);';

  // Prepare the values to be inserted into the query
  const values = [title, chapter_id, chapter_id];

  // Execute the query using the database connection
  return db.query(query, values)
    .then(() => {
      return true; // Story and first chapter created successfully
    })
    .catch(error => {
      console.error('Error creating story:', error);
      return false; // Story creation failed
    });
};

module.exports = create;
