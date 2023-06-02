const { INTERNAL_SERVER_ERROR_CODE } = require('../constants/constants');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERROR_CODE;
    this.name = 'ServerError';
  }
}

module.exports = ServerError;
