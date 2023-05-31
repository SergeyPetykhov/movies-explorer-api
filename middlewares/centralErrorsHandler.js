const {
  INTERNAL_SERVER_ERROR_CODE,
} = require('../constants/constants');

// централизованный обработчик ошибок
const centralErrorsHandler = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR_CODE
        ? 'Произошла неизвестная ошибка на сервере'
        : message,
    });

  next();
});

module.exports = { centralErrorsHandler };
