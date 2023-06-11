const Stories = require('../../../db/queries/stories/stories');
const Chapters = require('../../../db/queries/chapters/chapters');


async function approveChapterGetHandler(req, res) {
  let result;

  const userId = req.session.userId;
  const chapterId = req.query.chapterId;
  const storyId = await Stories.storyOfChapter(chapterId);

  const authorID = await Stories.author(storyId);
  if(!userId || authorID !== userId) {
    res.status(401).send('Unauthorized');
    return;
  }

  result = await Stories.approve(storyId, chapterId);
  res.json(result);
}

module.exports = approveChapterGetHandler;
