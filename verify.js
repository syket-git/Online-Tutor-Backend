const jwt = require('jsonwebtoken');

function verify(req, res, next) {
  const token = req.header('token');

  if (!token) return res.status(400).json('Access Denied');
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    res.user = verified.user;

    next();
  } catch (err) {
    return res.status(400).send('Access Denied');
  }
}

module.exports = verify;
