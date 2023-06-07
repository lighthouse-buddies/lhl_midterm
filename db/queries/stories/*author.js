const db = require('../../connection');

/**
 * Retrieves the author user ID of a story.
 * @param {number} story_id - The ID of the story.
 * @returns {Promise<number>} A promise that resolves to the author user ID.
 */
const getAuthor = (story_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `
        SELECT find_author($1) AS author_id
      `;
      const values = [story_id];

      const result = await db.query(query, values);
      const authorId = result.rows[0].author_id;

      resolve(authorId);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = getAuthor;
