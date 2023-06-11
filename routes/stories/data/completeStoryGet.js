const Stories = require('../../../db/queries/stories/stories');

async function completeStoryGetHandler(req, res) {
  const storyId = req.query.storyId;
  const userId = req.session.userId;
  const authorID = await Stories.author(storyId);
  if(!userId || authorID !== userId) {
    res.status(401).send('Unauthorized');
    return;
  }


  let complete = null;
  try {
    complete = await Stories.complete(storyId)
  } catch (err) {
    console.log(err);
  }
  res.json(complete);
}

module.exports = completeStoryGetHandler;
