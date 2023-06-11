const queries = require("../../../db/queries/queries");

/**
 * Helper function to fetch chapter data.
 * @param {number} chapterId - The ID of the chapter to fetch data for.
 * @param {Object} nextApproved - Promise for retrieving the next approved chapter.
 * @param {Object} nextChapters - Promise for retrieving the next chapters.
 * @returns {Object} - The fetched chapter data.
 * @throws {Error} - If there is an error retrieving the chapter data.
 */
const fetchChapterData = async (chapterId, nextApproved, nextChapters) => {
  const chapterData = {};

  try {
    const chapter = await queries.chapters.getData(chapterId);

    if (chapter !== null) {
      const userId = chapter.user_id;
      const currentChapterNumber = chapter.prev + 1;

      const user = await queries.users.getData(userId);
      const story = await queries.stories.storyOfChapter(chapterId);
      const storyTitle = await queries.stories.getData(story.id);

      chapterData.currentChapter = {
        username: user.username,
        chapterNumber: currentChapterNumber,
        chapter,
        storyTitle,
      };

      chapterData.nextChapters = await nextChapters;
      chapterData.nextApproved = await nextApproved;

      return chapterData;
    } else {
      throw new Error('Chapter not found');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving chapter');
  }
};

/**
 * Route handler for JSON response for chapter data to be accessed on the front end.
 * Includes the whole chapter row from the db, username, story Title, chapter Count, and current chapter number.
 * Also includes this same information for next approved chapter and next chapters.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const chaptersIdGetJsonHandler = async (req, res) => {
  const chapterId = parseInt(req.params.id, 10);

  try {
    const nextChapterIds = await queries.chapters.getNextChapters(chapterId);
    const nextChapters = await Promise.all(nextChapterIds.map(id => queries.chapters.getData(id)));
    const nextApprovedChapter = await queries.chapters.nextApproved(chapterId);

    const fetchChapterDataResult = await fetchChapterData(chapterId, nextApprovedChapter, nextChapters );

    const data = {
      currentChapter: fetchChapterDataResult.currentChapter,
      nextChapters: fetchChapterDataResult.nextChapters,
      nextApproved: fetchChapterDataResult.nextApproved,
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
};

module.exports = chaptersIdGetJsonHandler;
