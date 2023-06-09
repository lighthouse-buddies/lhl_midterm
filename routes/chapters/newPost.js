const queries = require("../../db/queries/queries");

///NOT WORKING because authenticate_user returning a boolean, but needs to be user id. Issue with db function because authenticate_user has been changted to a function returning boolean rather than original authenticate function which returned user id. NEEDS TO BE FIXED.
// POST route to create a new chapter, save the chapter to the databse.
// this post route will be getting prev from a hidden input in the form body. Which is linked to on contribute link on the stories_show template.
//<a href="/new?prevChapterId=chapID">Contribute</a>
const chaptersNewPostHandler = (req, res) => {
  const {prevChapterId, chapter_content} = req.body;
  const prev = req.query.prevChapterId;

  const userId = req.session.userId;
  if (userId !== null) {
    // Use the retrieved user ID for further processing
    queries.chapters.create(chapter_content, prevChapterId, userId)
      .then((chapterId) => {
        console.log(chapterId);

        res.redirect(`/chapters/`+chapterId.id);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send('Chapter creation failed');
      });

  }
};

module.exports = chaptersNewPostHandler;
