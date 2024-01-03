// eslint-disable-next-line max-classes-per-file
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const {
  NotFoundError, BadRequestError, AuthError, ForbiddenError,
} = require('../utils/errors');

// eslint-disable-next-line
module.exports = (err, req, res, next) => {
  if (err instanceof mongoose.Error) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }
  if (err instanceof NotFoundError || err instanceof BadRequestError
    || err instanceof AuthError || err instanceof ForbiddenError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(StatusCodes.CONFLICT).send({ message: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
};
