const db = require('../../connection');
const sequelize = require('../../sequelize');

/**
 * Retrieves the next chapter IDs for a given chapter ID.
 * @param {number} chapter_id - The ID of the current chapter.
 * @returns {Promise<number|null>} A promise that resolves to the next approved chapter ID if found, or null if not found.
 */
const nextApproved = async (chapter_id) => {
  let nextApprovedChapter;
  try {
    let firstChapterId = chapter_id;
    let chapter = await sequelize.Chapter.findByPk(chapter_id);
    while (chapter.prev !== null) {
      firstChapterId = chapter.prev;
      chapter = await sequelize.Chapter.findByPk(firstChapterId);
    }
    //find the story which has chapter.id as firstChapterId
    const story = await sequelize.Story.findOne({
      where: {
        first_chapter_id: firstChapterId,
      },
    });
    //next approved

    nextApprovedChapter = await sequelize.Chapter.findByPk(story.last_chapter_id);
    console.log("NEXT APPROVED", nextApprovedChapter);
    if (nextApprovedChapter == null) {

      return null;
    }
    while (nextApprovedChapter.prev !== chapter_id) {
      nextApprovedChapter = await sequelize.Chapter.findByPk(nextApprovedChapter.prev);
    }
  } catch (error) {
    // console.error('Error retrieving next chapters:', error);
    return null;
  }
  return nextApprovedChapter.id;

};

module.exports = nextApproved;
