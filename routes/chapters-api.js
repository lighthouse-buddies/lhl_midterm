const express = require('express');
<<<<<<< HEAD
const router  = express.Router();
const chapterQueries = require('../db/queries/queries');
=======
const res = require('express/lib/response');
const router = express.Router();
const queries = require('../db/queries/queries');
const { fetchChapterData } = require('./route-helpers');
>>>>>>> 59f2341 (refactor helper functions out of chaptersapi and storiesapi into route-helpers.js)

// POST route to create a new chapter
router.post('/new', (req, res) => {
  const { content, prev } = req.body;
  const email = req.session.email;
  const password = req.body.password;

  chapterQueries.chapters.create(content, prev, email, password)
  .then((chapterId) => {
    if (chapterId !== null) {
      return chapterQueries.chapters.getData(chapterId);
    } else {
      res.status(500).send('Chapter creation failed');
    }
  })
  .then((chapter) => {
    if (chapter !== null) {
      res.redirect(`/${chapter.id}`);
    } else {
      res.status(500).send('Chapter retrieval failed');
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send('Chapter creation failed');
  });
});

// GET route to getData chapter by id
router.get('/:id', (req, res) => {
  const chapterId = req.params.id;

  chapterQueries.chapters.getData(chapterId)
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

// GET route to getData next chapters by id
router.get('/:id', (req, res) => {
  const chapterId = req.params.id;

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
router.post('/:id/delete', (req, res) => {
  const chapterId = req.params.id;

  if (!req.session.user) {
    return res.redirect('/login');
  }

  chapterQueries.chapters.remove(chapterId)
    .then((success) => {
      if (success) {
        res.redirect('/');
      } else {
        res.status(500).send('Chapter removal failed');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Chapter removal failed');
    });
});

<<<<<<< HEAD
=======



>>>>>>> 59f2341 (refactor helper functions out of chaptersapi and storiesapi into route-helpers.js)
module.exports = router;
