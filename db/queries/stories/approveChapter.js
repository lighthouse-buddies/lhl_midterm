const db = require('../../connection');
const users = require('../users/users');

/**
 * Approves a chapter by adding it as the last chapter of a story in the database.
 * @param {number} story_id - The ID of the story.
 * @param {number} chapter_id - The ID of the chapter to approve.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the approval.
 */
const approveChapter = (story_id, chapter_id, email, password) => {
  // Check if the user is authenticated
  return users.authenticate(email, password)
    .then(authenticated => {
      if (!authenticated) {
        throw new Error('Authentication failed');
      }

      // Prepare the SQL queries with parameter placeholders
      const updateStoryQuery = 'UPDATE stories SET last_chapter_id = $1 WHERE id = $2;';
      const updateChapterQuery = 'UPDATE chapters SET prev = $1 WHERE id = $2;';

      // Start a transaction to ensure atomicity
      return db.transaction(async (client) => {
        try {
          // Update the last chapter ID of the story
          await client.query(updateStoryQuery, [chapter_id, story_id]);

          // Update the previous chapter ID of the approved chapter
          await client.query(updateChapterQuery, [null, chapter_id]);

          return true; // Chapter approved successfully
        } catch (error) {
          console.error('Error approving chapter:', error);
          throw error;
        }
      });
    })
    .catch(error => {
      console.error('Authentication failed:', error);
      return false; // Chapter approval failed due to authentication failure
    });
};

module.exports = approveChapter;
