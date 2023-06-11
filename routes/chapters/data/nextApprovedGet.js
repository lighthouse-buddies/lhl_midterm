const Chapter = require('../../../db/queries/chapters/chapters');



const nextApprovedGet = async (req, res) => {
  //should ren
  const chapterId = req.query.chapterId;
  const approvedChapterId =  await Chapter.nextApproved(chapterId);
  res.json(approvedChapterId);
}

module.exports = nextApprovedGet;
