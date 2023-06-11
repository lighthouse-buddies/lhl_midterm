const queries = require("../../../db/queries/queries");

//<a href="/new?prevChapterId=chapID">Contribute</a>
const chaptersNewPostHandler = async (req, res) => {
  const { prevChapterId, chapter_content } = req.body;
  const userId = req.session.userId;

  if (userId !== null) {
    try {
      const chapterId = await queries.chapters.create(chapter_content, prevChapterId, userId);
      console.log(chapterId);
      res.redirect(`/chapters/${chapterId.id}`);
    } catch (error) {
      console.log(error);
      res.status(500).send('Chapter creation failed');
    }
  }
};

module.exports = chaptersNewPostHandler;
