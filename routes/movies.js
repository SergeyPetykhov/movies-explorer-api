const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { URL_REGULAR_EXP } = require('../constants/constants');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// MOVIES ROUTES
const movieRouter = express.Router();

// возвращаем все сохранённые текущим пользователем фильмы
movieRouter.get('/', getMovies);

// создаём фильм с переданными в body данными
movieRouter.post('/', celebrate({

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
movieRouter.delete('/:movieId', celebrate({

  // валидируем данные с помощью библиотеки Joi
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
}), deleteMovie);

module.exports = { movieRouter };
