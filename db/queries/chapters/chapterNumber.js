
// const db = require('../../connection');
const  sequelize = require('../../sequelize');
/**
 * Retrieves the chapter number based on the given chapter ID.
 * @param {number} chapter_id - The ID of the chapter.
 * @returns {Promise<number>} A promise that resolves to the chapter number.
 */
const getChapterNumber = async (chapter_id) => {
  let chapter_number = 1;
  let chapter = await sequelize.Chapter.findByPk(chapter_id);
  while (chapter.prev !== null) {
    chapter_number++;
    chapter = await sequelize.Chapter.findByPk(chapter.prev);
  }
  return chapter_number;
};

module.exports = getChapterNumber;
