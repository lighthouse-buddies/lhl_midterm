const queries = require("../../../db/queries/queries");
const Chapter = require("../../../db/sequelize").Chapter;

const chaptersDeleteHandler = async (req, res) => {
  const chapterId = req.params.id;

  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    const success = await queries.chapters.remove(chapterId);
    if (success) {
      res.redirect('/');
    } else {
      res.status(500).send('Chapter removal failed');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Chapter removal failed');
  }
};

module.exports = chaptersDeleteHandler;
