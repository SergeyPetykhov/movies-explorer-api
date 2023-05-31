const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');
const { EMAIL_REGULAR_EXP } = require('../constants/constants');
const {
  getUserMe,
  updateUserData,
} = require('../controllers/users');

// USER ROUTES
const userRouter = express.Router();

// возвращаем данные пользователя
userRouter.get('/users/me', auth, getUserMe);

// обновляем данные пользователя
userRouter.patch('/users/me', auth, celebrate({

  // валидируем данные с помощью библиотеки Joi
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(EMAIL_REGULAR_EXP),
  }),
}), updateUserData);

module.exports = { userRouter };
