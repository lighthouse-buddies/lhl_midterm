const db = require('../../connection');

/**
 * Retrieves the next chapter IDs for a given chapter ID.
 * @param {number} chapter_id - The ID of the current chapter.
 * @returns {Promise<number>} A promise that resolves to the next approved chapter ID if found, or null if not found.
 */
const nextApproved = (chapter_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `
        SELECT find_next_approved_chapter_from_chapter($1) AS next_chapter_id
      `;
      const values = [chapter_id];

      const result = await db.query(query, values);
      const nextChapterId = result.rows[0].next_chapter_id;

      resolve(nextChapterId);


    } catch (error) {
      reject(error);
    }
  });
};

module.exports = nextApproved;
