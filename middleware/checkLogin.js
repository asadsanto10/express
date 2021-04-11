const jwt = require('jsonwebtoken');

const checkLogin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.secretkeytoken);
    const { username, userId } = decode;

    req.username = username;
    req.userid = userId;
    next();
  } catch (error) {
    // res.status(500).json({ error: `there was a auth middleware side error ${error}` });\

    next('authentication failure');
  }
};
module.exports = checkLogin;
