const Users = require('../../db/queries/users/users');

const registerGetHandler = (req, res) => {
  //TODO: check if user is logged in
  //TODO: if user is logged in, redirect to home page
  res.render('register', {userCookie: req.session.userId});
}

const registerPostHandler = (req, res) => {
  console.log(req.body);
  Users.create(req.body.username ,req.body.email, req.body.password).then((userId) => {
    if (userId !== null) {

      req.session.userId = userId; //TODO: set user cookie
      res.redirect('/');
    } else {
      res.status(500).send('User creation failed');
    }
  });



}

module.exports = {
  get: registerGetHandler,
  post: registerPostHandler
};
