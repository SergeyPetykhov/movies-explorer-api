const { CREATED_CODE } = require('../constants/constants');
const Movie = require('../models/movies');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

// возвращает все сохранённые текущим  пользователем фильмы
const getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      next((err));
    });
};

// создаёт фильм с переданными в теле данными req.body
const createMovie = (req, res, next) => {
  const ownerId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((newMovie) => {
      res.status(CREATED_CODE).send(newMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  Movie.findOne({ movieId })
    .orFail()
    .then((movie) => {
      const ownerId = movie.owner._id.toString();

      if (userId === ownerId) {
        Movie.deleteOne({ movieId })
          .orFail()
          .then(() => {
            res.send({ message: 'Фильм удалён' });
          })
          .catch(next);
      } else {
        next(new ForbiddenError('Нет прав для удаления этого фильма'));
      }
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Передан несуществующий _id фильма'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id фильма'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
