

module.exports = (req, res) => {




  console.log(req.session);
  res.render('stories_index', {userCookie: req.session.userId});
}
