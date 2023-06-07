//takes in story id and returns a promise (number) which is the user id
const db = require('../../connection');

/**
 * Retrieves the author user ID of a story.
 * @param {number} story_id - The ID of the story.
 * @returns {Promise<number>} A promise that resolves to the author user ID.
 */
const getAuthor = (story_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT user_id FROM chapters
      WHERE id = ${story_id}
    `;


    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const authorUserId = result.rows[0].user_id;
        resolve(authorUserId);
      }
    });
  });
};