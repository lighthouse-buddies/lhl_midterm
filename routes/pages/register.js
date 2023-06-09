const Users = require('../../db/queries/users/users');

const registerGetHandler = (req, res) => {
  if(req.session.userId){
    return res.redirect('/');
  }
  res.render('register', {userCookie: req.session.userId});
}

const registerPostHandler = (req, res) => {
  console.log(req.body);
  Users.create(req.body.username ,req.body.email, req.body.password).then((userId) => {
    if (userId !== null) {

      req.session.userId = userId; //TODO: set user cookie
      res.redirect('/');
    } else {
      res.redirect('/register');
    }
  });



}

module.exports = {
  get: registerGetHandler,
  post: registerPostHandler
};
