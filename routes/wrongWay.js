const express = require('express');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

// WRONGWAY ROUTES
const wrongWayRouter = express.Router();

// регистрируем нового пользователя
wrongWayRouter.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = { wrongWayRouter };
