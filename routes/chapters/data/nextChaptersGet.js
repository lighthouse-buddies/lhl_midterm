const Chapter = require('../../../db/queries/chapters/chapters');



const nextChaptersGet = async (req, res) => {
  //should ren
  const chapterId = req.query.chapterId;
  const nextChapterIds =  await Chapter.getNextChapters(chapterId);
  res.json(nextChapterIds);
}

module.exports = nextChaptersGet;
