

//

// const sequelize = require('../../sequelize');



async function getPreviewData(chapter_id, chapters,users,stories,votes) {
  let chapter = await chapters.getData(chapter_id);
  let story = await stories.storyOfChapter(chapter_id);
  let chapterNumber = await chapters.getChapterNumber(chapter_id);
  let user = await users.getData(chapter.user_id);
  let voteCount = await votes.getChapter(chapter_id);

  const templateVars = {
    title: story.title,
    chapterNumber: chapterNumber,
    content: chapter.content,
    username: user.name,
    votes: voteCount,
  }

  console.log(templateVars);

  return templateVars;

}

module.exports = getPreviewData;
