// коды для ответов сервера
const CREATED_CODE = 201;
const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const INTERNAL_SERVER_ERROR_CODE = 500;

// регулярное выражение для валидации URL
const URL_REGULAR_EXP = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/im;

// регулярное выражение для валидации E-MAIL
const EMAIL_REGULAR_EXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

// разрешенные адреса для передачи запросов на сервер
const ALLOWED_CORS = [
  'http://mesto-psv.nomoredomains.monster', // ИЗМЕНИТЬ ПУТИ!!!!!!!!!!!!!!
  'https://mesto-psv.nomoredomains.monster',
  'http://api.mesto-psv.nomoredomains.monster',
  'https://api.mesto-psv.nomoredomains.monster',
  'http://158.160.15.128',
  'https://158.160.15.128',
  'http://localhost:3000',
];

// разрешенные методы для передачи запросов на сервер
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  CREATED_CODE,
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  FORBIDDEN_ERROR,
  CONFLICT_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  URL_REGULAR_EXP,
  EMAIL_REGULAR_EXP,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
