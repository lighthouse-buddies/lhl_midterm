const Votes = require("../../db/queries/votes/votes");

const voteExistsHandler = (req, res) => {
  const userId = req.session.userId;
  // const chapterId = req.params.id;
  const  chapterId  = parseInt(req.query.chapter_id, 10);
  console.log('userId:', userId);
  console.log('chapterId:', chapterId);

  Votes.exists(userId, chapterId)
    .then((voted) => {
      res.send(voted);
    })
    .catch((error) => {
      console.error('Error checking if vote exists:', error);
      res.status(500).send('Error checking if vote exists');
    });
};

module.exports = voteExistsHandler;
