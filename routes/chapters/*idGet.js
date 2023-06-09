const chapters = require("../../db/queries/chapters/chapters");

const chaptersIdGetHandler = (req, res) => {
  const chapterId = req.params.id;

  chapters.getData(chapterId)
    .then((chapter) => {
      if (chapter !== null) {
        res.render('chapter', { chapter });
      } else {
        res.status(404).send('Chapter not found');
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error retrieving chapter');
    });
}

module.exports = chaptersIdGetHandler;
