const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth'); // защищаем роуты с помощью авторизации
const { URL_REGULAR_EXP } = require('../constants/constants');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// MOVIES ROUTES
const movieRouter = express.Router();

// возвращаем все сохранённые текущим пользователем фильмы
movieRouter.get('/movies', auth, getMovies);

// создаём фильм с переданными в body данными
movieRouter.post('/movies', auth, celebrate({

  // валидируем данные с помощью библиотеки Joi
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGULAR_EXP),
    trailerLink: Joi.string().required().regex(URL_REGULAR_EXP),
    thumbnail: Joi.string().required().regex(URL_REGULAR_EXP),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

// удаляем фильм по Id переданным через params
movieRouter.delete('/cards/:movieId', auth, celebrate({

  // валидируем данные с помощью библиотеки Joi
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = { movieRouter };
