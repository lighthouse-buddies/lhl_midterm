const Votes = require("../../db/queries/votes/votes");

const votesChapterCountGetHandler = (req, res) => {
  const chapterId = req.params.id;

  Votes.getChapter(chapterId)
    .then((count) => {
      const response = {
        chapterId: chapterId,
        count: count
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error retrieving vote count');
    });
};
module.exports = votesChapterCountGetHandler;
