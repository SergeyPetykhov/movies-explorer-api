const { BAD_REQUEST_ERROR_CODE } = require('../constants/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR_CODE;
    this.name = 'BadRequestError';
  }
}

module.exports = BadRequestError;
