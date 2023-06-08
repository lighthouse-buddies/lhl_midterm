const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const chapterQueries = require('../db/queries/queries');

// POST route to create a new chapter, save the chapter to the databse. 
// this post route needs to get the content and prev from the req.body, so either the url path needs to be:
//<a href="/new?prevChapterId=123">Go to Form</a>
//or we need a session cookie to tell the chapter
router.post('/new', (req, res) => {
  const { content, prev } = req.body;
  const email = req.session.email;
  const password = req.body.password;

  chapterQueries.chapters.create(content, prev, email, password)
    .then((chapterId) => {
      if (chapterId !== null) {
        return chapterQueries.chapters.getById(chapterId);
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

//GET route to get the chapter contribution form from the previous chapter ID. 
router.get('/new', (req, res) => {
  const prevChapterId = req.query.prevChapterId;
  res.render('stories_contribute', { prevChapterId });
});

// GET route to get chapter by id
router.get('/:id', (req, res) => {
  const chapterId = req.params.id;

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

module.exports = router;
