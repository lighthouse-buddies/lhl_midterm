const queries = require("../../db/queries/queries");

//WORKING, tested with CURL.
// GET route to get the chapter contribution form from the previous chapter ID stories_show page.
// This route is accessed from the 'contribute' link on the stories_show template, which has the current chap ID passed in as a prevChapterId parameter.
const chaptersNewGetHandler = (req, res) => {
  const prevChapterId = req.query.prevChapterId;
  res.render('stories_contribute', { prevChapterId, userCookie: req.session.userId });
};

module.exports = chaptersNewGetHandler;

