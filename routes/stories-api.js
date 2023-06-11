const express = require('express');
const router = express.Router();
const queries = require('../db/queries/queries');
const recentStoriesJsonHandler = require('./stories/query/storiesRecentGet');
const myStoriesGetHandler = require('./stories/storiesOfUserGet');
const ownerDeleteHandler = require('./stories/query/storiesDelete');
const userCreateStoryHandler = require('./stories/query/storiesCreatePost');
const approveChapterGetHandler = require('./stories/query/approveChapterGet');
const completeStoryHandlers = require('./stories/query/completeStory');
//get recent stories as json (for homepage)
router.get('/recent/json', recentStoriesJsonHandler);

//get create new story page (stories_create)
router.get('/new', (req, res) => {
  const userSession = req.session.userId;

  if (!userSession) {
    res.status(401).send('Unauthorized');
    return;
  }

  res.render('stories_create', { userCookie: userSession });
});

//user creates new story
router.post('/new', userCreateStoryHandler);

//get approve chapter page approve?chapterId=1
router.get('/approve/', approveChapterGetHandler);

// completion story page completion?storyId=1
router.post('/complete/', completeStoryHandlers.complete);
router.post('/unComplete/', completeStoryHandlers.unComplete)



//get stories for user
router.get('/:id', myStoriesGetHandler);

router.get('/delete/:id', ownerDeleteHandler);


//**NOT USING
// //GET completed stories
// router.get('/completed', (req, res) => {
//   const storyId = req.params.storyId;
//
//   queries.stories.completion(storyId)
//     .then(story => {
//       if (story) {
//         const mark = story.completion ? 'Completed' : 'In-Progress';
//         res.json({ mark, story });
//       } else {
//         res.status(404).send('Story not found');
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send('An error occurred');
//     });
// });
//

module.exports = router;
