const express = require('express');
const router  = express.Router();
const chapterQueries = require('../../db/queries/queries');

const chaptersNewPostHandler = require('./*newPost');
const chaptersIdGetHandler = require('./*idGet');

// POST route to create a new chapter
router.post('/new', chaptersNewPostHandler);

// GET route to getData chapter by id
router.get('/:id', chaptersIdGetHandler);

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
router.post('/:id/delete', );

module.exports = router;
