const express = require('express');

const rootRouter = express.Router();
const { auth } = require('../middlewares/auth');

const { signUpRouter } = require('./signUp');
const { signInRouter } = require('./signIn');
const { userRouter } = require('./users');
const { movieRouter } = require('./movies');
const { wrongWayRouter } = require('./wrongWay');

rootRouter.use('/signup', signUpRouter); // запрос на регистрацию нового пользователя
rootRouter.use('/signin', signInRouter); // запрос на авторизацию пользователя
rootRouter.use('/users', auth, userRouter); // запрос к сущности Users, защищён авторизацией с помощью middlewares auth
rootRouter.use('/movies', auth, movieRouter); // запрос к сущности Movies, защищён авторизацией с помощью middlewares auth
rootRouter.use('*', auth, wrongWayRouter); // запрос на несуществующий роут, защищён авторизацией с помощью middlewares auth

module.exports = { rootRouter };
