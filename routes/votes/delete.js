const Votes = require("../../db/queries/votes/votes");
const votesDeleteHandler = (req, res) => {
  const {user_id, chapter_id} = req.body;

  Votes.remove(user_id, chapter_id)
    .then((success) => {
      if (success) {
        res.status(200).send('Vote removed successfully');
      } else {
        res.status(500).send('Error removing vote');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error removing vote');
    });
}

module.exports = votesDeleteHandler;
