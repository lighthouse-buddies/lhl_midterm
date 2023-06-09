const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/queries');

const userCreateStoryHandler = (req, res) => {
  const { title, chapter_content } = req.body;
  const sessionUserId = req.session.userId;

  if (!sessionUserId) {
    res.status(401).send('Unauthorized');
    return;
  }

  queries.chapters.createChapter(chapter_content, null, sessionUserId)
    .then((chapter) => {
      if (!chapter) {
        throw new Error('Error creating chapter');
      }
      return queries.stories.create(title, chapter.id);
    })
    .then((success) => {
      if (!success) {
        throw new Error('Error creating story');
      }
      res.redirect('/my_stories');
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error creating story');
    });
};



module.exports = userCreateStoryHandler;