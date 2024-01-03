// eslint-disable-next-line max-classes-per-file
const { StatusCodes } = require('http-status-codes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.name = 'Not Found Error';
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.name = 'Bad Request Error';
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.name = 'Unauthorized Error';
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
    this.name = 'Forbidden Error';
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  AuthError,
  ForbiddenError,
};
