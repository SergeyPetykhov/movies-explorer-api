const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { CREATED_CODE } = require('../constants/constants');
const User = require('../models/users');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

// возвращает информацию о пользователе (email и имя)
const getUserMe = (req, res, next) => {
  const userId = req.user._id; // получаем Id пользователя переданный при авторизации auth.js
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next((err));
    });
};

// создаёт пользователя с переданными в теле email, password и name
const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((newUser) => {
          const data = newUser.toObject();
          delete data.password;
          res.status(CREATED_CODE).send(data);
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким E-mail уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      next((err));
    });
};

// обновляет информацию о пользователе (email и имя)
const updateUserData = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким E-mail уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении информации о пользователе'));
      } else {
        next(err);
      }
    });
};

// проверяет переданные в теле почту и пароль и возвращает JWT
const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  User.findOne({ email }).select('+password')

    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неправильные почта или пароль'));
      }

      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError('Неправильные почта или пароль'));
          }

          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY', { expiresIn: '7d' });

          return res.send({ token });
        });

      return false;
    })
    .catch((err) => {
      next((err));
    });
};

module.exports = {
  getUserMe,
  updateUserData,
  createUser,
  login,
};
