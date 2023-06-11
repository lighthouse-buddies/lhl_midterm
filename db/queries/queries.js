
const chapters = require('./chapters/chapters');
const users = require('./users/users');
const stories = require('./stories/stories');
const votes = require('./votes/votes');

const getPreviewData = require('./chapters/getPreviewData');

chapters.getPreviewData = async (chapter_id) => {
  return await getPreviewData(chapter_id, chapters, users, stories, votes);
}

module.exports = {
  users,
  chapters,
  stories,
  votes,
}
