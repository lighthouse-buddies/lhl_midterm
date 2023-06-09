const chapters = require("../../db/queries/chapters/chapters");


const chaptersNewPostHandler = (req, res) => {
  const { content, prev } = req.body;
  const email = req.session.email;
  const password = req.body.password;

  chapterQueries.chapters.create(content, prev, email, password)
    .then((chapterId) => {
      if (chapterId !== null) {
        return chapters.getData(chapterId);
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
}

module.exports = chaptersNewPostHandler;
