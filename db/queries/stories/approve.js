const db = require('../../connection');

/**
 * Approves a chapter by adding it as the last chapter of a story in the database.
 * @param {number} story_id - The ID of the story.
 * @param {number} chapter_id - The ID of the chapter to approve.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the approval.
 */
const approve = (story_id, chapter_id) => {
  // Prepare the SQL query with parameter placeholders
  const updateStoryQuery = 'UPDATE stories SET last_chapter_id = $1 WHERE id = $2;';

  // Execute the query using the database connection
  return db.query(updateStoryQuery, [chapter_id, story_id])
    .then(() => {
      return true; // Chapter approved successfully
    })
    .catch(error => {
      console.error('Error approving chapter:', error);
      return false; // Chapter approval failed
    });
};

module.exports = approve;
