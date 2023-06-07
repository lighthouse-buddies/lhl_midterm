
const db = require('../../connection');

/**
 * Retrieves the chapter number based on the given chapter ID.
 * @param {number} chapter_id - The ID of the chapter.
 * @returns {Promise<number>} A promise that resolves to the chapter number.
 */
const getChapterNumber = (chapter_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `
        SELECT get_chapter_number($1) AS chapter_number
      `;
      const values = [chapter_id];

      const result = await db.query(query, values);
      const chapterNumber = result.rows[0].chapter_number;

      resolve(chapterNumber);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = getChapterNumber;
