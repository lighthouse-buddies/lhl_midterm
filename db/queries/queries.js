
const chapters = require('./chapters/chapters');
const users = require('./users/users');
const stories = require('./stories/stories');
const votes = require('./votes/votes');

chapters.getPreviewData = async (chapter_id) => {
  return await chapters.getPreviewData(chapter_id, chapters, users, stories, votes);
}

module.exports = {
  users,
  chapters,
  stories,
  votes,
}
