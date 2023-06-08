const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const queries = require('../db/queries/queries');

//WORKING, tested with CURL.
// GET route to get the chapter contribution form from the previous chapter ID stories_show page.
// This route is accessed from the 'contribute' link on the stories_show template, which has the current chap ID passed in as a prevChapterId parameter.
router.get('/new', (req, res) => {
  const prevChapterId = req.query.prevChapterId;
  res.render('stories_contribute', { prevChapterId });
});

//NOT WORKING because of queries.chapters.getById. Everything else working fine. Issue with db function
// GET Route handler for rendering HTML template stories_show using the chapter data. Also renders the username and storytitle as template vars.
router.get('/:id', (req, res) => {
  const chapterId = req.params.id;

  queries.chapters.getById(chapterId)
    .then((chapter) => {
      if (chapter !== null) {
        const userId = chapter.user_id;
        const currentChapterNumber = chapter.prev + 1;

        const usernamePromise = queries.users.getUserById(userId).then((user) => user.username);
        const storyIdPromise = queries.stories.storyOfChapter(chapterId).then((story) => story.story_id);
        const storyTitlePromise = queries.stories.getData(storyIdPromise).then((story) => story.title);

        Promise.all([usernamePromise, storyTitlePromise])
          .then(([username, storyTitle, chapterCount]) => {
            const templateVars = {
              chapter,
              username,
              storyTitle,
              currentChapterNumber
            };
            res.render('stories_show', templateVars);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error retrieving data');
          });
      } else {
        res.status(404).send('Chapter not found');
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error retrieving chapter');
    });
});

///NOT WORKING because authenticate_user returning a boolean, but needs to be user id. Issue with db function because authenticate_user has been changted to a function returning boolean rather than original authenticate function which returned user id. NEEDS TO BE FIXED.
// POST route to create a new chapter, save the chapter to the databse. 
// this post route will be getting prev from a hidden input in the form body. Which is linked to on contribute link on the stories_show template. 
//<a href="/new?prevChapterId=chapID">Contribute</a>
router.post('/new', (req, res) => {
  const content = req.body;
  const prev = req.query.prevChapterId;
  const email = req.session.email;
  const password = req.body.password; //need to change to session so we can authenticate the user that way!!!

  // Call the authenticate function to retrieve the user ID
  queries.users.authenticate(email, password)
    .then((userId) => {
      if (userId !== null) {
        // Use the retrieved user ID for further processing
        queries.chapters.create(content, prev, userId)
          .then((chapterId) => {
            if (chapterId !== null) {
              return queries.chapters.getById(chapterId);
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
      } else {
        res.status(401).send('Invalid credentials'); // Authentication failed
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error authenticating user');
    });
});

//NOT WORKING because of queries.chapters.getById. Everything else working fine. Issue with db function
// Route handler for JSON response for chapter data to be accessed on the front end.
// Includes the whole chapter row from the db, username, story Title, chapter Count, and current chapter number.
// Also includes this same information for next approved chapter and next chapters.
router.get('/:id/json', (req, res) => {
  const chapterId = req.params.id;

  const nextChaptersPromise = queries.chapters.getNextChapters(chapterId)
    .then((nextChapterIds) => {
      const promises = nextChapterIds.map((nextChapterId) => {
        return queries.chapters.getById(nextChapterId);
      });
      return Promise.all(promises);
    });

  const nextApprovedPromise = queries.chapters.nextApproved(chapterId)
    .then((nextApprovedChapterId) => {
      if (nextApprovedChapterId !== null) {
        return queries.chapters.getById(nextApprovedChapterId);
      }
      return null;
    });

  const fetchChapterDataPromise = fetchChapterData(chapterId, nextApprovedPromise, nextChaptersPromise);

  Promise.all([fetchChapterDataPromise, nextChaptersPromise, nextApprovedPromise])
    .then(([chapterData, nextChapters, nextApprovedChapter]) => {
      const data = {
        currentChapter: chapterData.currentChapter,
        nextChapters: chapterData.nextChapters,
        nextApproved: chapterData.nextApproved,
      };

      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving data' });
    });
});

// Route to remove a chapter by ID
router.post('/:id/delete', (req, res) => {
  const chapterId = req.params.id;

  if (!req.session.user) {
    return res.redirect('/login');
  }

  queries.chapters.remove(chapterId)
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


// //HELPER FUNCTIONS:
// // Function to fetch chapter data.
// // RETURNS: an object {username, chapterNumber, chapter object {id, content, prev, user_id, created_at, deleted_at}, story title}
function fetchChapterData(chapterId, nextApprovedPromise, nextChaptersPromise) {
  const chapterData = {};

  return queries.chapters.getById(chapterId)
    .then((chapter) => {
      if (chapter !== null) {
        const userId = chapter.user_id;
        const currentChapterNumber = chapter.prev + 1;

        const usernamePromise = queries.users.get(userId).then((user) => user.username);
        const storyIdPromise = queries.stories.storyOfChapter(chapterId).then((story) => story.story_id);
        const storyTitlePromise = queries.stories.getData(storyIdPromise).then((story) => story.title);

        return Promise.all([usernamePromise, storyTitlePromise, nextApprovedPromise, nextChaptersPromise])
          .then(([username, storyTitle, nextApprovedChapter, nextChapters]) => {
            chapterData.currentChapter = {
              username,
              chapterNumber: currentChapterNumber,
              chapter,
              storyTitle,
            };
            chapterData.nextChapters = nextChapters;
            chapterData.nextApproved = nextApprovedChapter;

            return chapterData;
          });
      } else {
        throw new Error('Chapter not found');
      }
    })
    .catch((error) => {
      console.error(error);
      throw new Error('Error retrieving chapter');
    });
}

module.exports = router;
