const Chapters = require("../../../../db/queries/chapters/chapters");

const setUp = async (userId, numberOfChapter) => {
  const chapterIds = [];
  for (let i = 0; i < numberOfChapter; i++) {
    const content = `Chapter content ${i}`;
    const prev = i === 0 ? null : chapterIds[i - 1];
    const chapterId = (await Chapters.create(content, prev, userId)).id;
    chapterIds.push(chapterId);
  }
  return chapterIds;
}

module.exports = setUp;
