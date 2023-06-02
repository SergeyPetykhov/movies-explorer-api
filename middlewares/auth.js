const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { DEV_SECRET_KEY } = require('../constants/config'); // импортируем секретный ключ из config файла

const { NODE_ENV, JWT_SECRET } = process.env; // используем ключ для токена из .env

// проверка авторизации пользователя
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET_KEY); // проверяем переданный токен jwt.verify
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // фиксируем авторизованного пользователя в запросе

  return next();
};

module.exports = { auth };
