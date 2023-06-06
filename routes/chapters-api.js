const express = require('express');
const router  = express.Router();
const chapterQueries = require('../db/queries/queries');

// POST route to create a new chapter
app.post('/create_chapter', (req, res) => {
  const { content, prev } = req.body;
  const email = req.session.email;
  const password = req.body.password;

  chapterQueries.chapters.create(content, prev, email, password)
    .then((chapterId) => {
      if (chapterId !== null) {
        res.redirect('/chapter/' + chapterId);
      } else {
        res.status(500).send('Chapter creation failed');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Chapter creation failed');
    });
});

// GET route to get chapter by id
app.get('/chapter/:id', (req, res) => {
  const chapterId = parseInt(req.params.id);

  chapterQueries.chapters.getById(chapterId)
    .then((chapter) => {
      if (chapter !== null) {
        res.render('chapter', { chapter });
      } else {
        res.status(404).send('Chapter not found');
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error retrieving chapter');
    });
});

// GET route to get next chapters by id
app.get('/chapter/:id', (req, res) => {
  const chapterId = parseInt(req.params.id);

  chapterQueries.chapters.getNextChapters(chapterId)
    .then((nextChapterIds) => {
      res.render('nextChapter', { nextChapterIds });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error retrieving next chapters');
    });
});

// Route to remove a chapter by ID
app.post('/remove-chapter/:id', (req, res) => {
  const chapterId = parseInt(req.params.id);
  const email = req.session.email;
  const password = req.body.password;

  chapterQueries.chapters.remove(chapterId, email, password)
    .then((success) => {
      if (success) {
        res.redirect('/chapters');
      } else {
        res.status(500).send('Chapter removal failed');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Chapter removal failed');
    });
});

module.exports = router;
