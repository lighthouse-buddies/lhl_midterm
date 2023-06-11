

const logoutGet = (req, res) => {
  res.clearCookie('session');
  res.clearCookie('session.sig');
  return res.redirect('/');
};

module.exports = logoutGet;
