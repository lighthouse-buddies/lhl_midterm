
const Chapters = require('../../../db/queries/chapters/chapters');

async function chapterPreviewGetHandler(req, res) {
  const chapterId = req.query.chapterId;
  const templateVars = await Chapters.getPreviewData(chapterId);
  res.json(templateVars)
}

module.exports = chapterPreviewGetHandler;
