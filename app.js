// импортируем нужные модули
require('dotenv').config();

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // ограничение по времени на одно "окно" 15 минут
  max: 100, // Ограничить каждый IP-адрес 100 запросами за "окно" (здесь - за 15 минут)
  standardHeaders: true, // Возвращает информацию о пределе скорости в заголовках `Rate Limit-*`
  legacyHeaders: false, // Отключает заголовки `X-RateLimit-*`
});

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centralErrorsHandler } = require('./middlewares/centralErrorsHandler');
const { rootRouter } = require('./routes/index');

const { ALLOWED_CORS, DEFAULT_ALLOWED_METHODS } = require('./constants/constants');
const { DEV_PORT, DEV_DATABASE } = require('./constants/config');

const { PORT, DATABASE } = process.env; // если нет файла .env, используем DEV_PORT, DEV_DATABASE

mongoose.connect(DATABASE || DEV_DATABASE); // подключаемся к базе данных

// UTILS
app.use(express.json());

// DEFENSE UTILS
app.use(helmet());
app.use(limiter);

// CORS
app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const requestHeaders = req.headers['access-control-request-headers']; // сохраняем список заголовков исходного запроса

  // проверяем, что источник запроса в заголовке origin есть среди разрешённых
  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin); // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
  }

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    // разрешаем кросс-доменные запросы c заголовками исходного запроса
    res.header('Access-Control-Allow-Headers', requestHeaders);

    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
});

// подключаем логгер запросов
app.use(requestLogger);

// подключаем корневой роутер
app.use('/', rootRouter);

// подключаем логгер ошибок
app.use(errorLogger);

// подключаем celebrate error
app.use(errors());

// централизованный обработчик ошибок
app.use(centralErrorsHandler);

// будем принимать сообщения с указанного порта PORT || DEV_PORT
app.listen(PORT || DEV_PORT, () => {
  console.log(`Сервер открыт на порту: ${PORT || DEV_PORT}`);
});
