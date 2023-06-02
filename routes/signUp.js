const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');

// SIGNUP ROUTES
const signUpRouter = express.Router();

// регистрируем нового пользователя
signUpRouter.post('/', celebrate({

  // валидируем данные с помощью библиотеки Joi
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

module.exports = { signUpRouter };
