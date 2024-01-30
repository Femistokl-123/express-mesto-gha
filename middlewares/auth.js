const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/UnauthorizedErr');

const auth = (req, res, next) => {
  const token = req.header('Authorization');
  const secret = process.env.JWT_SECRET || 'some-secret-key';
  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    throw new UnauthorizedErr('Необходима авторизация');
  }
  req.user = payload;
  return next();
};

module.exports = auth;
