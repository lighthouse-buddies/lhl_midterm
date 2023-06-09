const express = require('express');
const router  = express.Router();
const voteQueries = require('../../db/queries/queries');

// POST creating a vote
router.post('/', (req, res) => {
  const { user_id, chapter_id } = req.body;

  voteQueries.votes.create(user_id, chapter_id)
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
});

// GET route for vote count of a chapter
router.get('/chapter/count', (req, res) => {
  const chapterId = req.params.id;

  voteQueries.votes.getChapter(chapterId)
    .then((count) => {
      res.status(200).send(`Vote count for chapter ${chapterId}: ${count}`);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error retrieving vote count');
    });
});

// DELETE removing a vote
router.delete('/', (req, res) => {
  const { user_id, chapter_id } = req.body;

  voteQueries.votes.remove(user_id, chapter_id)
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
});

module.exports = router;
