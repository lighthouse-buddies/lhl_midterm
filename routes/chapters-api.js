const express = require('express');
const router = express.Router();
const chapterQueries = require('../db/queries/queries');

// GET route to render the form for creating a new story
router.get('/new', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render('new-story');
});

// POST route to create a new chapter
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

// GET route to get chapter by id
router.get('/:id', (req, res) => {
  const chapterId = req.params.id;

  chapterQueries.chapters.getById(chapterId)
    .then((chapter) => {
      if (chapter !== null) {
        let authorId;
        let authorUsername;
        let numVotes;
        let nextApprovedChapter;
        let nextChapters;
        let chapterNumber;

        chapterQueries.stories.author(chapter.story_id)
          .then((id) => {
            authorId = id;
            return chapterQueries.chapters.getUsername(authorId);
          })
          .then((username) => {
            authorUsername = username;
            return chapterQueries.votes.getChapter(chapterId);
          })
          .then((count) => {
            numVotes = count;
            return chapterQueries.chapters.nextApproved(chapterId);
          })
          .then((approvedChapterId) => {
            nextApprovedChapter = approvedChapterId;
            return chapterQueries.chapters.getNextChapters(chapterId);
          })
          .then((chapters) => {
            nextChapters = chapters;
            return chapterQueries.chapters.getChapterNumber(chapterId);
          })
          .then((number) => {
            chapterNumber = number;

            res.render('stories_show', {
              chapter,
              authorId,
              authorUsername,
              storyTitle: chapter.story_title,
              chapterText: chapter.content,
              numVotes,
              nextApprovedChapter,
              nextChapters,
              chapterNumber
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send('Could not find chapter information');
          });
      } else {
        res.status(404).send('Chapter not found');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error retrieving chapter');
    });
});

// // GET route to get next chapters by id
// router.get('/:id', (req, res) => {
//   const chapterId = req.params.id;

//   chapterQueries.chapters.getNextChapters(chapterId)
//     .then((nextChapterIds) => {
//       res.render('nextChapter', { nextChapterIds });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send('Error retrieving next chapters');
//     });
// });

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
