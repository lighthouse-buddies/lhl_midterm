const Users = require('../../db/queries/users/users');

const loginGetHandler = (req, res) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  res.render('login', { userCookie: req.session.userId });
};

const loginPostHandler = async (req, res) => {
  console.log(req.body);

  try {
    const userId = await Users.authenticate(req.body.email, req.body.password);
    if (userId == null) {
        res.send('Incorrect email or password');
    } else {
      req.session.userId = userId; // TODO: set user cookie
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('User Login failed');
  }
};

module.exports = {
  get: loginGetHandler,
  post: loginPostHandler,
};
