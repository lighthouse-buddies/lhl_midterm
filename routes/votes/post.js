const queries = require("../../db/queries/queries");
const votesPostHandler = (req, res) => {
  const { chapter_id } = req.body;
  const user_id = req.session.userId;

  queries.votes.create(user_id, chapter_id)
    .then((success) => {
      if (success) {
        res.send('Vote created successfully');
      } else {
        res.status(500).send('Error creating vote');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error creating vote');
    });
}

module.exports = votesPostHandler;
