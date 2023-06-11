const Stories = require('../../db/queries/stories/stories');

module.exports = (req, res) => {
  Stories.recent(6).then((stories) => {
    for (let i = 0; i < stories.length; i++) {
      Stories.getData(stories[i].id).then((story) => {
        if (story !== null) {
          res.render('stories_index', {stories: stories});
        } else {
          // res.status(404).send('Story not found');
        }
      })
    }
  })




  console.log(req.session);
  res.render('stories_index', {userCookie: req.session.userId});
}

// change to using sequelize
//check the last_chapter_id of the story, the rank by the chapter's last_updated_at DESC


//SELECT * FROM stories JOIN chapters ON stories.last_chapter_id = chapters.id ORDER BY chapters.last_updated_at DESC LIMIT 6;
//then render with object
