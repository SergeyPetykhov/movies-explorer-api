const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');

// SIGNIN ROUTES
const signInRouter = express.Router();

// регистрируем нового пользователя
signInRouter.post('/signin', celebrate({

  // валидируем данные с помощью библиотеки Joi
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

module.exports = { signInRouter };
