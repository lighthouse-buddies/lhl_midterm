const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/queries');

// POST route for user to create a story
const userCreateStoryHandler = (req, res) => {
  const { title, chapter_content } = req.body;
  const sessionUserId = req.session.userId;
  console.log(req.body);
  if (!sessionUserId) {
    res.status(401).send('Unauthorized');
    return;
  }

  queries.chapters.create(chapter_content, null, sessionUserId).then(r => {
  console.log(r);

    queries.stories.create(title, r.id)
      .then((success) => {
        if (!success) {
          throw new Error('Error creating story');
        }
        res.redirect(`/stories/${sessionUserId}`);
      })
  })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error creating story');
    });
};


module.exports = userCreateStoryHandler;
