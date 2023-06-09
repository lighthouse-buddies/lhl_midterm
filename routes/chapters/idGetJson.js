const queries = require("../../db/queries/queries");

//NOT WORKING because of queries.chapters.getById. Everything else working fine. Issue with db function
// Route handler for JSON response for chapter data to be accessed on the front end.
// Includes the whole chapter row from the db, username, story Title, chapter Count, and current chapter number.
// Also includes this same information for next approved chapter and next chapters.
const chaptersIdGetJsonHandler = (req, res) => {
  const chapterId = req.params.id;

  const nextChaptersPromise = queries.chapters.getNextChapters(chapterId)
    .then((nextChapterIds) => {
      const promises = nextChapterIds.map((nextChapterId) => {
        return queries.chapters.getData(nextChapterId);
      });
      return Promise.all(promises);
    });

  const nextApprovedPromise = queries.chapters.nextApproved(chapterId)
    .then((nextApprovedChapterId) => {
      if (nextApprovedChapterId !== null) {
        return queries.chapters.getData(nextApprovedChapterId);
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
};

module.exports = chaptersIdGetJsonHandler;
