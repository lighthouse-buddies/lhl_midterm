const express = require('express');
const router  = express.Router();
const voteQueries = require('../db/queries/queries');

// POST creating a vote
router.post('/create', (req, res) => {
  const { email, password, chapter_id } = req.body;

  voteQueries.votes.createVotes(email, password, chapter_id)
    .then((success) => {
      if (success) {
        res.json({ message: 'Vote created successfully' });
      } else {
        res.status(500).json({ message: 'Error creating vote' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error creating vote');
    });
});

// DELETE removing a vote
router.delete('/remove', (req, res) => {
  const { email, password, chapter_id } = req.body;

  voteQueries.votes.removeVote(email, password, chapter_id)
    .then((success) => {
      if (success) {
        res.json({ message: 'Vote removed successfully' });
      } else {
        res.status(500).json({ message: 'Error removing vote' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error removing vote');
    });
});

module.exports = router;
