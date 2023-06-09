const queries = require("../../db/queries/queries");

///NOT WORKING because authenticate_user returning a boolean, but needs to be user id. Issue with db function because authenticate_user has been changted to a function returning boolean rather than original authenticate function which returned user id. NEEDS TO BE FIXED.
// POST route to create a new chapter, save the chapter to the databse.
// this post route will be getting prev from a hidden input in the form body. Which is linked to on contribute link on the stories_show template.
//<a href="/new?prevChapterId=chapID">Contribute</a>
const chaptersNewPostHandler = (req, res) => {
  const content = req.body;
  const prev = req.query.prevChapterId;
  const email = req.session.email;
  const password = req.body.password; //need to change to session so we can authenticate the user that way!!!

  // Call the authenticate function to retrieve the user ID
  queries.users.authenticate(email, password)
    .then((userId) => {
      if (userId !== null) {
        // Use the retrieved user ID for further processing
        queries.chapters.create(content, prev, userId)
          .then((chapterId) => {
            if (chapterId !== null) {
              return queries.chapters.getData(chapterId);
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
      } else {
        res.status(401).send('Invalid credentials'); // Authentication failed
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error authenticating user');
    });
}

module.exports = chaptersNewPostHandler;
