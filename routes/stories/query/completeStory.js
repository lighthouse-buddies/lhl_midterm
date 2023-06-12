const Stories = require('../../../db/queries/stories/stories');



function completeStoryHandlerGenerator(value) {
  return (
  async function completeStoryPostHandler(req, res) {
    const storyId = req.body.storyId;
    const userId = req.session.userId;
    const authorID = await Stories.author(storyId);
    if (!userId || authorID !== userId) {
      res.status(401).send('Unauthorized');
      return;
    }


    let success = null;
    try {
      success = await Stories.setCompletion(storyId, value)
    } catch (err) {
      console.log(err);
    }
    res.json(success);
  }
  );
}







module.exports = {
  complete: completeStoryHandlerGenerator(true),
  unComplete: completeStoryHandlerGenerator(false)
}
