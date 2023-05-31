const { CONFLICT_ERROR_CODE } = require('../constants/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR_CODE;
    this.name = 'ConflictError';
  }
}

module.exports = ConflictError;
