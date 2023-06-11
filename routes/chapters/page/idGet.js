const queries = require("../../../db/queries/queries");

/**
 * GET Route handler for rendering HTML template chapter_show using the chapter query.
 * Also renders the username, story title, and chapter number as template variables.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const chaptersIdGetHandler = async (req, res) => {
  try {
    const chapterId = req.params.id;

    const chapter = await queries.chapters.getData(chapterId);
    const storyId = await queries.stories.storyOfChapter(chapterId);
    const votes = await queries.votes.getChapter(chapterId);
    const chapterNumber = await queries.chapters.getChapterNumber(chapterId);
    const user = await queries.users.getData(chapter.user_id);
    const story = await queries.stories.getData(storyId);

    const templateVars = {
      chapter,
      complete: story.complete,
      username: user.username,
      storyTitle: story.title,
      currentChapterNumber: chapterNumber,
      storyId,
      votes,
      stories: [],
      userCookie: req.session.userId
    };

    res.render('chapter_show', templateVars);
  } catch (error) {
    console.error('Error retrieving query:', error);
    // Handle the error as needed
    res.status(500).send('Error retrieving query');
  }
};

module.exports = chaptersIdGetHandler;
