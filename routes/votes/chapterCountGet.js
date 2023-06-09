const Votes = require("../../db/queries/votes/votes");
const votesChapterCountGetHandler = (req, res) => {
  const chapterId = req.params.id;

  Votes.getChapter(chapterId)
    .then((count) => {
      res.status(200).send(`Vote count for chapter ${chapterId}: ${count}`);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error retrieving vote count');
    });
}
module.exports = votesChapterCountGetHandler;
