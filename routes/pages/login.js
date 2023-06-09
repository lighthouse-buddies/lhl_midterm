const Users = require('../../db/queries/users/users');

const loginGetHandler = (req, res) => {
  //TODO: check if user is logged in
  //TODO: if user is logged in, redirect to home page
  res.render('login', {userCookie: req.session.userId});
}

const loginPostHandler = (req, res) => {
  console.log(req.body);
  Users.authenticate(req.body.email, req.body.password).then((userId) => {
    if (userId !== null) {
      req.session.userId = userId; //TODO: set user cookie
      res.redirect('/');
    } else {
      res.status(500).send('User Login failed');
    }
  });



}

module.exports = {
  get: loginGetHandler,
  post: loginPostHandler
};
